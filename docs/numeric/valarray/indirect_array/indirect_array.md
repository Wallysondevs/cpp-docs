# std::indirect_array&lt;T&gt;::indirect_array

```cpp
  // (1)
private:
indirect_array();  // (até C++11)
public:
indirect_array() = delete;  // (desde C++11)
public:
indirect_array( const indirect_array& other );  // (2)
```

  
1) O construtor padrão é declarado privado e não definido (até C++11) explicitamente definido como deletado (desde C++11): `indirect_array` não é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).

2) Constrói um `indirect_array` a partir de outro `indirect_array` other.

### Parâmetros

other  |  \-  |  `indirect_array` para inicializar com   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98  | o construtor de cópia era privado  | tornou-se público 