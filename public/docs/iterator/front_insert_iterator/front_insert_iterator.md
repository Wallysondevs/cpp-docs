# std::front_insert_iterator&lt;Container&gt;::front_insert_iterator

```cpp
explicit front_insert_iterator( Container& c );  // (até C++20)
constexpr explicit front_insert_iterator( Container& c );  // (desde C++20)
```

  
Inicializa o ponteiro subjacente para o container para [std::addressof](<#/doc/memory/addressof>)(c). 

### Parâmetros

c  |  \-  |  container para inicializar o inserter com   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[P2325R3](<https://wg21.link/P2325R3>) | C++20  | construtor padrão foi fornecido como C++20  
iterators devem ser [`default_initializable`](<#/doc/concepts/default_initializable>) | removido junto com o requisito 