# std::forward_list&lt;T,Allocator&gt;::unique

```cpp
  // (1)
void unique();  // (desde C++11)
(até C++20)
size_type unique();  // (desde C++20)
  // (2)
template< class BinaryPredicate >
void unique( BinaryPredicate p );  // (desde C++11)
(até C++20)
template< class BinaryPredicate >
size_type unique( BinaryPredicate p );  // (desde C++20)
```

  
Remove todos os elementos duplicados _consecutivos_ do container. Apenas o primeiro elemento em cada grupo de elementos iguais é mantido. Invalida apenas os iterators e referências para os elementos removidos. 

1) Usa o operator== para comparar os elementos.

2) Usa p para comparar os elementos.

O comportamento é indefinido se o comparador correspondente não estabelecer uma relação de equivalência. 

### Parâmetros

p  |  \-  |  predicado binário que retorna ​true se os elementos devem ser tratados como iguais.   
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2`, independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1, a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).  
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo forward_list<T,Allocator>::const_iterator possa ser desreferenciado e então implicitamente convertido para ambos. ​   
Requisitos de tipo   
-`BinaryPredicate` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).   
  
### Valor de retorno

(nenhum)  | (até C++20)  
---|---
O número de elementos removidos.  | (desde C++20)  
  
### Complexidade

Se [empty()](<#/doc/container/forward_list/empty>) for true, nenhuma comparação é realizada. 

Caso contrário, dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(begin(), end()): 

1) Exatamente \\(\scriptsize N-1\\)N-1 comparações usando operator==.

2) Exatamente \\(\scriptsize N-1\\)N-1 aplicações do predicado p.

### Notas

Teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_list_remove_return_type`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | Altera o tipo de retorno   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <forward_list>
     
    std::ostream& operator<< (std::ostream& os, std::forward_list<int> const& container)
    {
        for (int val : container)
            os << val << ' ';
        return os << '\n';
    }
     
    int main()
    {
        std::forward_list<int> c{1, 2, 2, 3, 3, 2, 1, 1, 2};
        std::cout << "Before unique(): " << c;
        const auto count1 = c.unique();
        std::cout << "After unique():  " << c
                  << count1 << " elements were removed\n";
     
        c = {1, 2, 12, 23, 3, 2, 51, 1, 2, 2};
        std::cout << "\nBefore unique(pred): " << c;
     
        const auto count2 = c.unique(mod = 10
        {
            return (x % mod) == (y % mod);
        });
     
        std::cout << "After unique(pred):  " << c
                  << count2 << " elements were removed\n";
    }
```

Saída: 
```
    Before unique(): 1 2 2 3 3 2 1 1 2
    After unique():  1 2 3 2 1 2
    3 elements were removed
     
    Before unique(pred): 1 2 12 23 3 2 51 1 2 2
    After unique(pred):  1 2 23 2 51 2
    4 elements were removed
```

### Veja também

[ unique](<#/doc/algorithm/unique>) |  remove elementos duplicados consecutivos em um range   
(modelo de função)  