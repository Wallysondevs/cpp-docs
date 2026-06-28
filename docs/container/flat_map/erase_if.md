# std::erase_if (std::flat_map)

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
template< class Key, class T, class Compare, class KeyContainer, class MappedContainer,
class Pred >
std::flat_map<Key, T, Compare, KeyContainer, MappedContainer>::size_type
erase_if( std::flat_map<Key, T, Compare, KeyContainer, MappedContainer>& c,
Pred pred );
```

Apaga todos os elementos que satisfazem o predicado pred de c.

O predicado pred é satisfeito se a expressão bool(pred([std::pair](<#/doc/utility/pair>)&lt;const Key&, const T&&gt;(e))) for verdadeira, onde `e` é algum elemento em c.

`Key` e `T` devem ser [MoveAssignable](<#/doc/named_req/MoveAssignable>). Caso contrário, o comportamento é indefinido.

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

O algoritmo é _estável_ , ou seja, a ordem dos elementos que não são apagados permanece inalterada.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_map>
    
    void println(auto rem, auto const& container)
    {
        std::cout << rem << '{';
        for (char sep[]{0, ' ', 0}; const auto& [key, value] : container)
            std::cout << sep << '{' << key << ", " << value << '}', *sep = ',';
        std::cout << "}\n";
    }
    
    int main()
    {
        std::flat_map<int, char> data
        {
            {1, 'a'}, {2, 'b'}, {3, 'c'}, {4, 'd'},
            {5, 'e'}, {4, 'f'}, {5, 'g'}, {5, 'g'},
        };
        println("Original:\n", data);
    
        const auto count = std::erase_if(data, 
        {
            auto const& [key, value] = item;
            return (key & 1) == 1;
        });
    
        println("Erase items with odd keys:\n", data);
        std::cout << count << " items removed.\n";
    }
```

Saída:
```
    Original:
    {{1, a}, {2, b}, {3, c}, {4, d}, {5, e}}
    Erase items with odd keys:
    {{2, b}, {4, d}}
    3 items removed.
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)