# std::slice_array&lt;T&gt;::slice_array

```cpp
  // (1)
private:
slice_array();  // (até C++11)
public:
slice_array() = delete;  // (desde C++11)
public:
slice_array( const slice_array& other );  // (2)
```

  
1) O construtor padrão é declarado privado e não definido (até C++11) explicitamente definido como deletado (desde C++11): `slice_array` não é [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).

2) Constrói um `slice_array` a partir de outro `slice_array` other.

### Parâmetros

other  |  \-  |  `slice_array` para inicializar   
  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 253](<https://cplusplus.github.io/LWG/issue253>) | C++98  | o construtor de cópia era privado  | tornou-se público 