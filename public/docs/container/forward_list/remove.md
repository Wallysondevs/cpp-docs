# std::forward_list&lt;T,Allocator&gt;::remove, remove_if

```cpp
  // (1)
void remove( const T& value );  // (desde C++11)
(ate C++20)
size_type remove( const T& value );  // (desde C++20)
  // (2)
template< class UnaryPredicate >
void remove_if( UnaryPredicate p );  // (desde C++11)
(ate C++20)
template< class UnaryPredicate >
size_type remove_if( UnaryPredicate p );  // (desde C++20)
```

  
Remove todos os elementos que satisfazem critérios específicos. Invalida apenas os iterators e referências para os elementos removidos.

1) Remove todos os elementos que são iguais a `value` (usando `operator==`).

2) Remove todos os elementos para os quais o predicado `p` retorna `true`.

### Parâmetros

value  |  \-  |  valor dos elementos a serem removidos   
---|---|---
p  |  \-  |  predicado unário que retorna `true` se o elemento deve ser removido.   
A expressão `p(v)` deve ser conversível para `bool` para cada argumento `v` do tipo `T` (possivelmente `const`), independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro `T&` não é permitido, nem `T` a menos que para `T` um `move` seja equivalente a uma cópia (desde C++11). ​   
Requisitos de tipo   
-`UnaryPredicate` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).   
  
### Valor de retorno

(nenhum)  | (ate C++20)  
---|---
O número de elementos removidos.  | (desde C++20)  
  
### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(begin(), end()): 

1) Exatamente \\(\scriptsize N\\)N comparações usando `operator==`.

2) Exatamente \\(\scriptsize N\\)N aplicações do predicado `p`.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_list_remove_return_type`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | Altera o tipo de retorno   
  
### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <iostream>
    
    int main()
    {
        std::forward_list<int> l = {1, 100, 2, 3, 10, 1, 11, -1, 12};
    
        auto count1 = l.remove(1);
        std::cout << count1 << " elements equal to 1 were removed\n";
    
        auto count2 = l.remove_if({ return n > 10; });
        std::cout << count2 << " elements greater than 10 were removed\n";
    
        std::cout << "Finally, the list contains: ";
        for (int n : l)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    2 elements equal to 1 were removed
    3 elements greater than 10 were removed
    Finally, the list contains: 2 3 10 -1
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) |  remove elementos que satisfazem critérios específicos   
(modelo de função)  