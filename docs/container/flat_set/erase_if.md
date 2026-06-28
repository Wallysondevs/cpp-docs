# std::erase_if (std::flat_set)

Definido no cabeçalho `[<flat_set>](<#/doc/header/flat_set>)`

```c
template< class Key, class Compare, class KeyContainer,
class Pred >
std::flat_set<Key, Compare, KeyContainer>::size_type
erase_if( std::flat_set<Key, Compare, KeyContainer>& c,
Pred pred );
```

Apaga todos os elementos que satisfazem o predicado pred de c.

O predicado pred é satisfeito se a expressão bool(pred([std::as_const](<#/doc/utility/as_const>)(e))) for verdadeira, onde `e` é algum elemento em c.

`Key` deve ser [MoveAssignable](<#/doc/named_req/MoveAssignable>). Caso contrário, o comportamento é indefinido.

### Parâmetros

- **c** — adaptador de container do qual apagar
- **pred** — predicado que retorna true se o elemento deve ser apagado

### Valor de retorno

O número de elementos apagados.

### Complexidade

Exatamente c.size() aplicações do predicado pred.

### Exceções

Se `erase_if` lançar uma exceção, c permanece em um estado válido, mas não especificado (talvez vazio).

### Observações

O algoritmo é _estável_, ou seja, a ordem dos elementos que não são apagados permanece inalterada.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_set>
    
    void println(auto rem, auto const& container)
    {
        std::cout << rem << '{';
        for (char sep[]{0, ' ', 0}; const auto& item : container)
            std::cout << sep << item, *sep = ',';
        std::cout << "}\n";
    }
    
    int main()
    {
        std::flat_set data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
        println("Original:\n", data);
    
        auto divisible_by_3 =  { return (x % 3) == 0; };
    
        const auto count = std::erase_if(data, divisible_by_3);
    
        println("Erase all items divisible by 3:\n", data);
        std::cout << count << " items erased.\n";
    }
```

Saída:
```
    Original:
    {0, 1, 2, 3, 4, 5, 6, 7}
    Erase all items divisible by 3:
    {1, 2, 4, 5, 7}
    3 items erased.
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)