# std::multimap&lt;Key,T,Compare,Allocator&gt;::equal_range

```cpp
std::pair<iterator, iterator> equal_range( const Key& key );  // (1)
std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;  // (2)
template< class K >
std::pair<iterator, iterator> equal_range( const K& x );  // (3) (desde C++14)
template< class K >
std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;  // (4) (desde C++14)
```

Retorna um range contendo todos os elementos com a chave fornecida no container. O range é definido por dois iterators, um apontando para o primeiro elemento que _não é menor_ que a chave e outro apontando para o primeiro elemento _maior_ que a chave. Alternativamente, o primeiro iterator pode ser obtido com [lower_bound()](<#/doc/container/multimap/lower_bound>), e o segundo com [upper_bound()](<#/doc/container/multimap/upper_bound>).

1,2) Compara as chaves com `key`.

3,4) Compara as chaves com o valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave para comparar os elementos
- **x** — valor alternativo que pode ser comparado a `Key`

### Valor de retorno

[std::pair](<#/doc/utility/pair>) contendo um par de iterators que definem o range desejado: o primeiro apontando para o primeiro elemento que _não é menor_ que a chave e o segundo apontando para o primeiro elemento _maior_ que a chave.

Se não houver elementos _não menores_ que a chave, o iterator past-the-end (veja [end()](<#/doc/container/multimap/end>)) é retornado como o primeiro elemento. Similarmente, se não houver elementos _maiores_ que a chave, o iterator past-the-end é retornado como o segundo elemento.

Como [`emplace`](<#/doc/container/multimap/emplace>) e [`insert`](<#/doc/container/multimap/insert>) sem hint sempre inserem no upper bound, a ordem dos elementos equivalentes no equal range é a ordem de inserção, a menos que [`insert`](<#/doc/container/multimap/insert>) com hint ou [`emplace_hint`](<#/doc/container/multimap/emplace_hint>) tenha sido usado para inserir um elemento em uma posição diferente. | (desde C++11)

### Complexidade

Logarítmica no tamanho do container.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Busca de comparação heterogênea em [containers associativos](<#/doc/container>), para sobrecargas ([3,4](<#/doc/container/multimap/equal_range>))

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
     
    int main()
    {
        std::multimap<int, char> dict
        {
            {1, 'A'},
            {2, 'B'},
            {2, 'C'},
            {2, 'D'},
            {4, 'E'},
            {3, 'F'}
        };
     
        auto range = dict.equal_range(2);
     
        for (auto i = range.first; i != range.second; ++i)
            std::cout << i->first << ": " << i->second << '\n';
    }
```

Output:
```
    2: B
    2: C
    2: D
```

### Veja também

[ find](<#/doc/container/multimap/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/multimap/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ count](<#/doc/container/multimap/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ upper_bound](<#/doc/container/multimap/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave fornecida
(função membro pública)
[ lower_bound](<#/doc/container/multimap/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(template de função)