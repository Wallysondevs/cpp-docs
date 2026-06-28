# std::packaged_task&lt;R(Args...)&gt;::operator=

```cpp
packaged_task& operator=( const packaged_task& ) = delete;  // (1) (desde C++11)
packaged_task& operator=( packaged_task&& rhs ) noexcept;  // (2) (desde C++11)
```

  
1) O operador de atribuição por cópia é deletado, `std::packaged_task` é somente movível.

2) Libera o estado compartilhado, se houver, destrói a tarefa previamente mantida, e move o estado compartilhado e a tarefa de propriedade de rhs para *this. rhs é deixado sem um estado compartilhado e com uma tarefa movida-de.

### Parâmetros

rhs  |  \-  |  o `std::packaged_task` do qual mover   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2067](<https://cplusplus.github.io/LWG/issue2067>) | C++11  | o tipo do parâmetro do operador de atribuição por cópia era `packaged_task&` | adicionado const