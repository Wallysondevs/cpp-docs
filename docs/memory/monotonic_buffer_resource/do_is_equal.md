# std::pmr::monotonic_buffer_resource::do_is_equal

```cpp
virtual bool do_is_equal( const std::pmr::memory_resource& other ) const noexcept;  // (desde C++17)
```

Compara *this com other para identidade - memória alocada usando um [`monotonic_buffer_resource`](<#/doc/memory/monotonic_buffer_resource>) só pode ser desalocada usando aquele mesmo recurso.

### Valor de retorno

this == &other

### Relatório de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3000](<https://cplusplus.github.io/LWG/issue3000>) | C++17 | `dynamic_cast` desnecessário foi realizado | removido

### Veja também

[ do_is_equal](<#/doc/memory/memory_resource/do_is_equal>)[virtual] | compara para igualdade com outro `memory_resource`
(função membro virtual privada de `std::pmr::memory_resource`)