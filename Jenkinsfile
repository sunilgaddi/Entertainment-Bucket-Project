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
        stage('Copying Build') {
            steps {
                sh "sudo cp -v -r jenkins/workspace/Mern-Pipeline/client/build/* /var/www/mern.local/"
            }
        }
    }
}
