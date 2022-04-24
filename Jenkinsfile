pipeline {
    agent any
    
    tools {nodejs '17.0.0'}
    
    stages {
        stage('Checking Version') {
            steps {
                bat "npm version"
                git "https://github.com/sunilgaddi/Entertainment-Bucket-Project.git"
            }
        }
    }
}
