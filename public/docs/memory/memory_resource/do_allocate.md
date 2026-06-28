# std::pmr::memory_resource::do_allocate

```cpp
virtual void* do_allocate( std::size_t bytes, std::size_t alignment ) = 0;  // (desde C++17)
```

  
Aloca armazenamento com um tamanho de pelo menos `bytes` bytes, alinhado ao `alignment` especificado.

`alignment` deve ser uma potência de dois.

### Exceptions

Lança uma exceção se o armazenamento do tamanho e alinhamento solicitados não puder ser obtido.

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente aos padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2843](<https://cplusplus.github.io/LWG/issue2843>) | C++17  | tratamento de alinhamento não suportado contraditório  | lança uma exceção   
  
### See also 

[ allocate](<#/doc/memory/memory_resource/allocate>) |  aloca memória   
(função membro pública)  