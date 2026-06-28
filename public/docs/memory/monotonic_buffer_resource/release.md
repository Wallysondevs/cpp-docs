# std::pmr::monotonic_buffer_resource::release

```cpp
void release();  // (desde C++17)
```

  
Libera toda a memória alocada chamando a função `deallocate` no recurso de memória upstream conforme necessário. Redefine o _buffer atual_ e o _tamanho do próximo buffer_ para seus valores iniciais na construção.

A memória é liberada de volta para o recurso upstream mesmo que `deallocate` não tenha sido chamada para alguns dos blocos alocados.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3120](<https://cplusplus.github.io/LWG/issue3120>) | C++17  | `release` pode não tornar o buffer inicial reutilizável se fornecido  | exigido para fazê-lo   
  
### Veja também 

[ deallocate](<#/doc/memory/memory_resource/deallocate>) |  desaloca memória   
(função membro pública de `std::pmr::memory_resource`)  