# std::inplace_vector&lt;T,N&gt;::erase

```cpp
constexpr iterator erase( const_iterator pos );  // (1) (desde C++26)
constexpr iterator erase( const_iterator first, const_iterator last );  // (2) (desde C++26)
```

Apaga os elementos especificados do container.

1) Remove o elemento em pos.

2) Remove os elementos no range `[`first`, `last`)`.

Iterators (incluindo o iterator [`end()`](<#/doc/container/inplace_vector/end>)) e referências aos elementos no ou após o ponto da remoção são invalidados.

O iterator pos deve ser válido e desreferenciável. Assim, o iterator end() (que é válido, mas não é desreferenciável) não pode ser usado como valor para pos.

O iterator first não precisa ser desreferenciável se first == last: apagar um range vazio é uma no-op.

### Parâmetros

- **pos** — iterator para o elemento a ser removido
- **first, last** — range de elementos a serem removidos

### Valor de retorno

Iterator que segue o último elemento removido.

1) Se pos se refere ao último elemento, então o iterator end() é retornado.

2) Se last == end() antes da remoção, então o iterator end() atualizado é retornado.

Se `[`first`, `last`)` for um range vazio, então last é retornado.

### Exceções

Não lança exceções a menos que uma exceção seja lançada pelo operador de atribuição de `T`.

### Complexidade

Linear: o número de chamadas ao destrutor de `T` é o mesmo que o número de elementos apagados, o operador de atribuição de `T` é chamado um número de vezes igual ao número de elementos no vector após os elementos apagados.

### Observações

Quando elementos do container precisam ser apagados com base em um predicado, em vez de iterar o container e chamar o `erase` unário, a sobrecarga de range de iterators é geralmente usada com [`std::remove()/std::remove_if()`](<#/doc/algorithm/remove>) para minimizar o número de moves dos elementos restantes (não removidos) — este é o erase-remove idiom. [`std::erase_if()`](<#/doc/container/inplace_vector/erase2>) substitui o erase-remove idiom.

### Exemplo

Execute este código
```cpp
    #include <inplace_vector>
    #include <print>
    
    int main()
    {
        std::inplace_vector<int, 10> v{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        std::println("{}", v);
    
        v.erase(v.begin());
        std::println("{}", v);
    
        v.erase(v.begin() + 2, v.begin() + 5);
        std::println("{}", v);
    
        // Erase all even numbers
        for (std::inplace_vector<int, 10>::iterator it{v.begin()}; it != v.end();)
            if (*it % 2 == 0)
                it = v.erase(it);
            else
                ++it;
        std::println("{}", v);
    }
```

Output:
```
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    [1, 2, 6, 7, 8, 9]
    [1, 7, 9]
```

### Veja também

[ erase(std::inplace_vector)erase_if(std::inplace_vector)](<#/doc/container/inplace_vector/erase2>)(C++26) | apaga todos os elementos que satisfazem critérios específicos
(modelo de função)
[ clear](<#/doc/container/inplace_vector/clear>) | limpa o conteúdo
(função membro pública)
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão