# std::insert_iterator&lt;Container&gt;::insert_iterator

```cpp
insert_iterator( Container& c, typename Container::iterator i ); |  | (ate C++20)
constexpr insert_iterator( Container& c, ranges::iterator_t<Container> i );  // (desde C++20)
```

  
Inicializa o ponteiro subjacente para o container para [std::addressof](<#/doc/memory/addressof>)(c) e o iterator subjacente para i. 

### Parâmetros

c  |  \-  |  container para inicializar o inserter com   
---|---|---
i  |  \-  |  iterator para inicializar o inserter com   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto
---|---|---|---
[LWG 561](<https://cplusplus.github.io/LWG/issue561>) | C++98  | o tipo de i era independente de `Container` | é o tipo de iterator de `Container`  
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | construtor padrão foi fornecido como C++20  
iterators devem ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido junto com o requisito 