# std::optional&lt;T&gt;::or_else

```cpp
template< class F >
constexpr optional or_else( F&& f ) const&;  // (1) (desde C++23)
template< class F >
constexpr optional or_else( F&& f ) &&;  // (2) (desde C++23)
```

  
Retorna *this se ele contiver um valor. Caso contrário, retorna o resultado de f.

O programa é malformado se [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)&lt;F&gt;> não for o mesmo que [std::optional](<#/doc/utility/optional>)&lt;T&gt;.

1) Equivalente a return *this ? *this : [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)();. Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::copy_constructible](<#/doc/concepts/copy_constructible>)&lt;T&gt; e [std::invocable](<#/doc/concepts/invocable>)&lt;F&gt; forem modelados.

2) Equivalente a return *this ? std::move(*this) : [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)();. Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::move_constructible](<#/doc/concepts/move_constructible>)&lt;T&gt; e [std::invocable](<#/doc/concepts/invocable>)&lt;F&gt; forem modelados.

### Parâmetros

f  |  \-  |  uma função ou objeto [Callable](<#/doc/named_req/Callable>) que retorna um [std::optional](<#/doc/utility/optional>)&lt;T&gt;  
  
### Valor de retorno

*this ou o resultado de f, conforme descrito acima.

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_optional`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [Operações monádicas](<#/doc/utility/optional>) em [std::optional](<#/doc/utility/optional>)  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <optional>
    #include <string>
     
    int main()
    {
        using maybe_int = std::optional<int>;
     
        auto valueless = []
        {
            std::cout << "Valueless: ";
            return maybe_int{0};
        };
     
        maybe_int x;
        std::cout << x.or_else(valueless).value() << '\n';
     
        x = 42;
        std::cout << "Has value: ";
        std::cout << x.or_else(valueless).value() << '\n';
     
        x.reset();
        std::cout << x.or_else(valueless).value() << '\n';
    }
```

Saída: 
```
    Valueless: 0
    Has value: 42
    Valueless: 0
```

### Veja também

[ value_or](<#/doc/utility/optional/value_or>) |  retorna o valor contido se disponível, outro valor caso contrário   
(função membro pública)  
[ and_then](<#/doc/utility/optional/and_then>)(C++23) |  retorna o resultado da função fornecida sobre o valor contido se ele existir, ou um `optional` vazio caso contrário   
(função membro pública)  
[ transform](<#/doc/utility/optional/transform>)(C++23) |  retorna um `optional` contendo o valor contido transformado se ele existir, ou um `optional` vazio caso contrário   
(função membro pública)