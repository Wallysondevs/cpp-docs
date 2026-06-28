# std::owner_equal

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
struct owner_equal;
```

Este objeto de função fornece comparação de igualdade de tipos mistos baseada em proprietário (em oposição a baseada em valor) tanto para [std::weak_ptr](<#/doc/memory/weak_ptr>) quanto para [std::shared_ptr](<#/doc/memory/shared_ptr>). A comparação é tal que dois smart pointers são considerados equivalentes apenas se ambos estiverem vazios ou se compartilharem a propriedade, mesmo que os valores dos ponteiros brutos obtidos por `get()` sejam diferentes (por exemplo, porque apontam para subobjetos diferentes dentro do mesmo objeto).

1) A comparação de igualdade de tipos mistos baseada em proprietário não é fornecida para tipos diferentes de [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>).

2) A comparação de igualdade de tipos mistos baseada em proprietário de [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>).

É o predicado de comparação preferido ao construir containers associativos não ordenados com [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>) como chaves, juntamente com std::owner_hash, ou seja, [std::unordered_map](<#/doc/container/unordered_map>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;, U, std::owner_hash, std::owner_equal> ou [std::unordered_map](<#/doc/container/unordered_map>)<[std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;, U, std::owner_hash, std::owner_equal>.

3) `std::owner_equal` deduz os tipos dos parâmetros a partir dos argumentos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | compara seus argumentos usando semântica baseada em proprietário
(função)

## std::owner_equal::operator()

```cpp
template< class T, class U >
bool operator()( const std::shared_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) const noexcept;  // (desde C++26)
template< class T, class U >
bool operator()( const std::shared_ptr<T>& lhs,
const std::weak_ptr<U>& rhs ) const noexcept;  // (desde C++26)
template< class T, class U >
bool operator()( const std::weak_ptr<T>& lhs,
const std::shared_ptr<U>& rhs ) const noexcept;  // (desde C++26)
template< class T, class U >
bool operator()( const std::weak_ptr<T>& lhs,
const std::weak_ptr<U>& rhs ) const noexcept;  // (desde C++26)
```

Compara lhs e rhs usando semântica baseada em proprietário. Efetivamente chama lhs.owner_equal(rhs).

A comparação de igualdade é uma relação de equivalência.

lhs e rhs são equivalentes apenas se ambos estiverem vazios ou compartilharem a propriedade.

### Parâmetros

- **lhs, rhs** — ponteiros de propriedade compartilhada para comparar

### Valor de retorno

true se lhs e rhs estiverem ambos vazios ou compartilharem a propriedade, conforme determinado pela comparação de igualdade baseada em proprietário, false caso contrário.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_smart_ptr_owner_equality`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Habilita o uso de `std::shared_ptr` e `std::weak_ptr` como chaves em [containers associativos não ordenados](<#/doc/container>)

### Veja também

[ owner_equal](<#/doc/memory/shared_ptr/owner_equal>)(C++26) | fornece comparação de igualdade baseada em proprietário de shared pointers
(função membro pública de `std::shared_ptr<T>`)
[ owner_equal](<#/doc/memory/weak_ptr/owner_equal>)(C++26) | fornece comparação de igualdade baseada em proprietário de weak pointers
(função membro pública de `std::weak_ptr<T>`)