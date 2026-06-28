# std::pmr::unsynchronized_pool_resource::~unsynchronized_pool_resource

```cpp
virtual ~unsynchronized_pool_resource();  // (desde C++17)
```

Destrói um `unsynchronized_pool_resource`.

Desaloca toda a memória de propriedade deste recurso chamando this->release().

### Veja também

[ release](<#/doc/memory/unsynchronized_pool_resource/release>) | libera toda a memória alocada
(função membro pública)