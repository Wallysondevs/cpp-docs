# std::mask_array&lt;T&gt;::mask_array

```cpp
  // (1)
private:
mask_array();  // (até C++11)
public:
mask_array() = delete;  // (desde C++11)
public:
mask_array( const mask_array& other );  // (2)
```

  
1) O construtor padrão é declarado privado e não definido (até C++11) explicitamente definido como deletado (desde C++11): `mask_array` não é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).

2) Constrói um `mask_array` a partir de outro `mask_array` other.

### Parâmetros

other  |  \-  |  `mask_array` para inicializar com   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98  | o construtor de cópia era privado  | tornado público 