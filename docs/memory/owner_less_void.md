# std::owner_less

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template<>
struct owner_less<void>;
```

[std::owner_less](<#/doc/memory/owner_less>)&lt;void&gt; é uma especialização de [std::owner_less](<#/doc/memory/owner_less>) com tipos de parâmetro deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | compara seus argumentos usando semântica baseada em proprietário
(função)

## std::owner_less&lt;void&gt;::operator()

```cpp
template< class T, class U >
bool operator()( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) const noexcept;  // (desde C++17)
template< class T, class U >
bool operator()( const std::shared_ptr<T>& lhs,
const std::weak_ptr<U>& rhs ) const noexcept;  // (desde C++17)
template< class T, class U >
bool operator()( const std::weak_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) const noexcept;  // (desde C++17)
template< class T, class U >
bool operator()( const std::weak_ptr<T>& lhs,
const std::weak_ptr<U>& rhs ) const noexcept;  // (desde C++17)
```

Compara lhs e rhs usando semântica baseada em proprietário. Efetivamente chama lhs.owner_before(rhs).

A ordenação é uma relação de ordem fraca estrita.

lhs e rhs são equivalentes apenas se ambos estiverem vazios ou compartilharem a propriedade.

### Parâmetros

- **lhs, rhs** — ponteiros de propriedade compartilhada para comparar

### Valor de retorno

true se lhs for _menor que_ rhs conforme determinado pela ordenação baseada em proprietário.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_transparent_operators`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | std::owner_less transparente ([std::owner_less](<#/doc/memory/owner_less>)&lt;void&gt;)

### Veja também

[ owner_before](<#/doc/memory/shared_ptr/owner_before>) | fornece ordenação baseada em proprietário de shared pointers
(função membro pública de `std::shared_ptr<T>`)
[ owner_before](<#/doc/memory/weak_ptr/owner_before>) | fornece ordenação baseada em proprietário de weak pointers
(função membro pública de `std::weak_ptr<T>`)