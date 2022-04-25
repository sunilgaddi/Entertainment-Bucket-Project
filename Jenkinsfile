pipeline {
    agent {label "ubuntu"}
    
    tools {nodejs 'node'}
    
    stages {
        stage('Installing Dependencies') {
            steps {
                echo "========== INSTALLING DEPENDENCIES STARTED =========="
                sh "npm install"
                dir('client') {
                    sh "dir"
                    sh 'npm install'
                    sh 'npm run build'
                }
                echo "========== INSTALLING DEPENDENCIES FINISHED =========="
            }
        }
        stage('Restarting Service') {
            steps {
                sh "sudo service nginx restart"
            }
        }
    }
}
