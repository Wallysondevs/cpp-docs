# std::list&lt;T,Allocator&gt;::erase

```cpp
  // (1)
iterator erase( iterator pos );  // (até C++11)
iterator erase( const_iterator pos );  // (desde C++11)
  // (2)
iterator erase( iterator first, iterator last );  // (até C++11)
iterator erase( const_iterator first, const_iterator last );  // (desde C++11)
```

  
Apaga os elementos especificados do container.

1) Remove o elemento em `pos`.

2) Remove os elementos no range `[`first`, `last`)`.

Referências e iterators para os elementos apagados são invalidados. Outras referências e iterators não são afetados.

O iterator `pos` deve ser válido e desreferenciável. Assim, o iterator [end()](<#/doc/container/list/end>) (que é válido, mas não é desreferenciável) não pode ser usado como valor para `pos`.

O iterator `first` não precisa ser desreferenciável se `first == last`: apagar um range vazio é uma no-op.

### Parâmetros

pos  |  \-  |  iterator para o elemento a ser removido   
---|---|---
first, last  |  \-  |  range de elementos a serem removidos   
  
### Valor de retorno

Iterator que segue o último elemento removido.

1) Se `pos` se refere ao último elemento, então o iterator [end()](<#/doc/container/list/end>) é retornado.

2) Se `last == end()` antes da remoção, então o iterator [end()](<#/doc/container/list/end>) atualizado é retornado.

Se `[`first`, `last`)` é um range vazio, então `last` é retornado.

### Exceções

(nenhuma)

### Complexidade

1) Constante.

2) Linear na distância entre `first` e `last`.

### Notas

Quando elementos do container precisam ser apagados com base em um predicado, em vez de iterar o container e chamar `erase` unário, a sobrecarga de range de iterators é geralmente usada com [`std::remove()/std::remove_if()`](<#/doc/algorithm/remove>) para minimizar o número de moves dos elementos restantes (não removidos) — este é o "erase-remove idiom". [`std::erase_if()`](<#/doc/container/list/erase2>) substitui o "erase-remove idiom". (desde C++20)

### Exemplo

Execute este código
```
    #include <list>
    #include <iostream>
    #include <iterator>
     
    void print_container(const std::list<int>& c)
    {
        for (int i : c)
            std::cout << i << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::list<int> c{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        print_container(c);
     
        c.erase(c.begin());
        print_container(c);
     
        std::list<int>::iterator range_begin = c.begin();
        std::list<int>::iterator range_end = c.begin();
        std::advance(range_begin, 2);
        std::advance(range_end, 5);
     
        c.erase(range_begin, range_end);
        print_container(c);
     
        // Erase all even numbers
        for (std::list<int>::iterator it = c.begin(); it != c.end();)
        {
            if (*it % 2 == 0)
                it = c.erase(it);
            else
                ++it;
        }
        print_container(c);
    }
```

Saída:
```
    0 1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
    1 2 6 7 8 9
    1 7 9
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 151](<https://cplusplus.github.io/LWG/issue151>) | C++98  | `first` era exigido ser desreferenciável, o que tornava o comportamento de limpar uma `list` vazia indefinido  | não exigido se  
`first == last`  
  
### Veja também

[ erase(std::list)erase_if(std::list)](<#/doc/container/list/erase2>)(C++20) |  apaga todos os elementos que satisfazem critérios específicos   
(function template)  
[ clear](<#/doc/container/list/clear>) |  limpa o conteúdo   
(public member function)