# std::hash&lt;std::type_index&gt;

Definido no cabeçalho `[<typeindex>](<#/doc/header/typeindex>)`

```c
template<> struct hash<std::type_index>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::type_index](<#/doc/types/type_index>) permite aos usuários obter hashes de objetos do tipo [std::type_index](<#/doc/types/type_index>).

O operator() membro efetivamente retorna o mesmo valor que [hash_code()](<#/doc/types/type_index/hash_code>).

### Veja também

[ hash_code](<#/doc/types/type_index/hash_code>) | retorna código hash
(função membro pública)