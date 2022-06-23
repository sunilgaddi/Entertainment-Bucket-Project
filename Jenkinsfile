pipeline {
    agent {label "ubuntu"}
    
    tools {jenkins.plugins.nodejs.tools.NodeJSInstallation 'node'}
    
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
    }
}
