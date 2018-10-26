// container definitions doc https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
{
    "AWSEBDockerrunVersion": 2,
    "containerDefinitions": [
        {
            "name": "client",  //arbirtary, but its for us
            "image": "ccincotti3/multi-client", //from docker hub!
            "hostname": "client", //setting our hostname. What NGINX is looking for when it tries to redirect traffic upstream. Not neccessary with worker and nginx (not accessed through a hostname), but thrown in just to be consistent.

            "essential": false //if set true, then if this crashes, all other containers will shut down. ATLEAST One container must be marked as essential

            "link" //form a unidirectional link from nginx to client and server. Maps to the name property! not the hostname!
        }
    ]
}