# std::pmr::monotonic_buffer_resource::~monotonic_buffer_resource

```cpp
virtual ~monotonic_buffer_resource();  // (desde C++17)
```

Destrói um `monotonic_buffer_resource`.

Desaloca toda a memória possuída por este recurso chamando `this->release()`.

### Veja também

[ release](<#/doc/memory/monotonic_buffer_resource/release>) | libera toda a memória alocada
(função membro pública)