# std::multiset&lt;Key,Compare,Allocator&gt;::equal_range

```cpp
std::pair<iterator, iterator> equal_range( const Key& key );  // (1)
std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;  // (2)
template< class K >
std::pair<iterator, iterator> equal_range( const K& x );  // (3) (desde C++14)
template< class K >
std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;  // (4) (desde C++14)
```

Retorna um range contendo todos os elementos com a chave fornecida no container. O range é definido por dois iterators, um apontando para o primeiro elemento que _não é menor_ que `key` e outro apontando para o primeiro elemento _maior_ que `key`. Alternativamente, o primeiro iterator pode ser obtido com [lower_bound()](<#/doc/container/multiset/lower_bound>), e o segundo com [upper_bound()](<#/doc/container/multiset/upper_bound>).

1,2) Compara as chaves com `key`.

3,4) Compara as chaves com o valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave para comparar os elementos
- **x** — valor alternativo que pode ser comparado a `Key`

### Valor de retorno

[std::pair](<#/doc/utility/pair>) contendo um par de iterators que definem o range desejado: o primeiro apontando para o primeiro elemento que _não é menor_ que `key` e o segundo apontando para o primeiro elemento _maior_ que `key`.

Se não houver elementos _não menores_ que `key`, um iterator past-the-end (veja [end()](<#/doc/container/multiset/end>)) é retornado como o primeiro elemento. Similarmente, se não houver elementos _maiores_ que `key`, um iterator past-the-end é retornado como o segundo elemento.

Como [`emplace`](<#/doc/container/multiset/emplace>) e [`insert`](<#/doc/container/multiset/insert>) sem hint sempre inserem no upper bound, a ordem dos elementos equivalentes no equal range é a ordem de inserção, a menos que [`insert`](<#/doc/container/multiset/insert>) com hint ou [`emplace_hint`](<#/doc/container/multiset/emplace_hint>) tenha sido usado para inserir um elemento em uma posição diferente. | (desde C++11)

### Complexidade

Logarítmica no tamanho do container.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Busca de comparação heterogênea em [containers associativos](<#/doc/container>), para sobrecargas ([3,4](<#/doc/container/multiset/equal_range>))

### Exemplo

Execute este código
```
    #include <iostream>
    #include <set>
     
    template<typename I>
    void print_equal_range(I first, I lb, I ub, I last)
    {
        for (I i{first}; i != lb; ++i)
            std::cout << *i << ' ';
        std::cout << "[ ";
     
        for (I i{lb}; i != ub; ++i)
            std::cout << *i << ' ';
        std::cout << ") ";
     
        for (I i{ub}; i != last; ++i)
            std::cout << *i << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::multiset<int> c{4, 3, 2, 1, 3, 3};
        std::cout << "c = ";
        print_equal_range(begin(c), begin(c), end(c), end(c));
        for (int key{}; key != 6; ++key)
        {
            std::cout << "key = " << key << "; equal range = ";
            const auto [lb, ub] = c.equal_range(key);
            print_equal_range(begin(c), lb, ub, end(c));
        }
    }
```

Saída:
```
    c = [ 1 2 3 3 3 4 )
    key = 0; equal range = [ ) 1 2 3 3 3 4
    key = 1; equal range = [ 1 ) 2 3 3 3 4
    key = 2; equal range = 1 [ 2 ) 3 3 3 4
    key = 3; equal range = 1 2 [ 3 3 3 ) 4
    key = 4; equal range = 1 2 3 3 3 [ 4 )
    key = 5; equal range = 1 2 3 3 3 4 [ )
```

### Veja também

[ find](<#/doc/container/multiset/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/multiset/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ count](<#/doc/container/multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ upper_bound](<#/doc/container/multiset/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)
[ lower_bound](<#/doc/container/multiset/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)