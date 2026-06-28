# std::pmr::synchronized_pool_resource::~synchronized_pool_resource

```cpp
virtual ~synchronized_pool_resource();  // (desde C++17)
```

  
Destrói um `synchronized_pool_resource`. 

Desaloca toda a memória pertencente a este recurso chamando `this->release()`. 

### Veja também 

[ release](<#/doc/memory/synchronized_pool_resource/release>) | libera toda a memória alocada   
(função membro pública)  