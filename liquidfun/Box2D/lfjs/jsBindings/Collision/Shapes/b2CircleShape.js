var b2CircleShape_CreateFixture =
  Module.cwrap('b2CircleShape_CreateFixture', 'number',
    ['number',
      // Fixture defs
      'number', 'number', 'number',
      'number', 'number',
      // Circle members
      'number', 'number',
      'number']);

var b2CircleShape_CreateParticleGroup =
  Module.cwrap('b2CircleShape_CreateParticleGroup', 'number',
    ['number',
      // particleGroupDef
      'number', 'number', 'number',
      'number', 'number', 'number',
      'number', 'number', 'number',
      'number', 'number', 'number',
      'number', 'number', 'number',
      'number', 'number', 'number',
      'number',
      //Circle
      'number', 'number', 'number'
    ]);

var b2CircleShape_DestroyParticlesInShape =
  Module.cwrap('b2CircleShape_DestroyParticlesInShape', 'number',
    ['number',
    //circle
     'number', 'number', 'number',
     // transform
     'number', 'number', 'number', 'number']);

/**@constructor*/
function b2CircleShape() {
  this.position = new b2Vec2();
  this.radius = 0;
  this.type = b2Shape_Type_e_circle;
}

b2CircleShape.prototype.ComputeAABB = function(aabb, transform){
    var center = new b2Vec2();
    b2Vec2.Mul(center, transform, this.position);
    aabb.lowerBound.Set(center.x - this.radius, center.y - this.radius);
    aabb.upperBound.Set(center.x + this.radius, center.y + this.radius);
}

b2CircleShape.prototype.TestPoint = function(transform, point){
    var center = new b2Vec2();
    var dis = new b2Vec2();
    b2Vec2.Mul(center, transform, this.position);
    b2Vec2.Sub(dis, point ,center);
    
    // dot
    var disDot = dis.x*dis.x + dis.y*dis.y;
    return disDot <= this.radius*this.radius;
}

b2CircleShape.prototype._CreateFixture = function(body, fixtureDef) {
  return b2CircleShape_CreateFixture(body.ptr,
    // fixture Def
    fixtureDef.density, fixtureDef.friction, fixtureDef.isSensor,
    fixtureDef.restitution, fixtureDef.userData,
    // filter def
    fixtureDef.filter.categoryBits, fixtureDef.filter.groupIndex, fixtureDef.filter.maskBits,
    // circle data
    this.position.x, this.position.y, this.radius);
};

b2CircleShape.prototype._CreateParticleGroup = function(particleSystem, pgd) {
  return b2CircleShape_CreateParticleGroup(
    particleSystem.ptr,
    // particle group def
    pgd.angle,  pgd.angularVelocity, pgd.color.r,
    pgd.color.g, pgd.color.b, pgd.color.a,
    pgd.flags, pgd.group.ptr, pgd.groupFlags,
    pgd.lifetime, pgd.linearVelocity.x, pgd.linearVelocity.y,
    pgd.position.x, pgd.position.y, pgd.positionData,
    pgd.particleCount, pgd.strength, pgd.stride,
    pgd.userData,
    // circle
    this.position.x, this.position.y, this.radius);
};

b2CircleShape.prototype._DestroyParticlesInShape = function(ps, xf) {
  return b2CircleShape_DestroyParticlesInShape(ps.ptr,
    // circle
    this.position.x, this.position.y, this.radius,
    // transform
    xf.p.x, xf.p.y, xf.q.s, xf.q.c);
};