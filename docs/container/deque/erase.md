# std::deque&lt;T,Allocator&gt;::erase

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

Todos os iterators e referências são invalidados, a menos que os elementos apagados estejam no final ou no início do container, caso em que apenas os iterators e referências para os elementos apagados são invalidados. O iterator [`end()`](<#/doc/container/deque/end>) também é invalidado, a menos que os elementos apagados estejam no início do container e o último elemento não seja apagado.

O iterator `pos` deve ser válido e dereferenciável. Assim, o iterator [end()](<#/doc/container/deque/end>) (que é válido, mas não é dereferenciável) não pode ser usado como valor para `pos`.

O iterator `first` não precisa ser dereferenciável se `first == last`: apagar um range vazio é uma no-op.

### Parâmetros

- **pos** — iterator para o elemento a ser removido
- **first, last** — range de elementos a serem removidos
Requisitos de tipo
-`T` deve satisfazer os requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>).

### Valor de retorno

Iterator que segue o último elemento removido.

1) Se `pos` se refere ao último elemento, então o iterator [end()](<#/doc/container/deque/end>) é retornado.

2) Se `last == end()` antes da remoção, então o iterator [end()](<#/doc/container/deque/end>) atualizado é retornado.

Se `[`first`, `last`)` é um range vazio, então `last` é retornado.

### Exceções

Não lança exceções, a menos que uma exceção seja lançada pelo operador de atribuição de `T`.

### Complexidade

Linear: o número de chamadas ao destrutor de `T` é o mesmo que o número de elementos apagados; o número de chamadas ao operador de atribuição de `T` não é maior do que o menor entre o número de elementos antes dos elementos apagados e o número de elementos depois dos elementos apagados.

### Notas

Quando elementos do container precisam ser apagados com base em um predicado, em vez de iterar o container e chamar `erase` unário, a sobrecarga de range de iterators é geralmente usada com [`std::remove()/std::remove_if()`](<#/doc/algorithm/remove>) para minimizar o número de moves dos elementos restantes (não removidos) — este é o idioma erase-remove. [`std::erase_if()`](<#/doc/container/deque/erase2>) substitui o idioma erase-remove. (desde C++20)

### Exemplo

Execute este código
```cpp
    #include <deque>
    #include <iostream>

    void print_container(const std::deque<int>& c)
    {
        for (int i : c)
            std::cout << i << ' ';
        std::cout << '\n';
    }

    int main()
    {
        std::deque<int> c{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        print_container(c);

        c.erase(c.begin());
        print_container(c);

        c.erase(c.begin() + 2, c.begin() + 5);
        print_container(c);

        // Erase all even numbers
        for (std::deque<int>::iterator it = c.begin(); it != c.end();)
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

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 151](<https://cplusplus.github.io/LWG/issue151>) | C++98 | `first` era exigido como dereferenciável, o que
tornava o comportamento de limpar um `deque` vazio indefinido | não exigido se
`first == last`
[LWG 638](<https://cplusplus.github.io/LWG/issue638>) | C++98 | o iterator past-the-end não era invalidado | ele é invalidado se os elementos forem
apagados do meio ou do fim

### Veja também

[ erase(std::deque)erase_if(std::deque)](<#/doc/container/deque/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)
[ clear](<#/doc/container/deque/clear>) | limpa o conteúdo
(função membro pública)