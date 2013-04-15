function GameSettings($scope) {
    
    $scope.ShipSpeed = level.player.movespeed;
    $scope.ReloadSpeed = level.player.reloadTime;

    $scope.updateSettings = function () {
        level.player.movespeed = $scope.ShipSpeed;
        level.player.reloadTime = $scope.ReloadSpeed;
    }
}