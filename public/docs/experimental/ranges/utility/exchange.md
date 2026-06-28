# std::experimental::ranges::exchange

Definido no cabeçalho `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```c
template< MoveConstructible T, class U = T >
requires Assignable<T&, U>
constexpr T exchange( T& obj, U&& new_val ) noexcept(/* see below */);
```

  
Substitui o valor de obj por new_value e retorna o valor antigo de obj, como se por 
```
    T old_value = std::move(obj);
    obj = std::forward<U>(new_value);
    return old_value;
```

### Parâmetros

obj  |  \-  |  objeto cujo valor será substituído   
---|---|---
new_value  |  \-  |  o valor a ser atribuído a `obj`  
  
### Valor de retorno

O valor antigo de obj. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value &&  
[std::is_nothrow_assignable](<#/doc/types/is_assignable>)<T&, U>::value)

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ exchange](<#/doc/utility/exchange>)(C++14) |  substitui o argumento por um novo valor e retorna seu valor anterior   
(modelo de função)  