# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::equal_range

```cpp
std::pair<iterator, iterator> equal_range( const Key& key );  // (1) (desde C++11)
std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;  // (2) (desde C++11)
template< class K >
std::pair<iterator, iterator> equal_range( const K& x );  // (3) (desde C++20)
template< class K >
std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;  // (4) (desde C++20)
```

1,2) Retorna um range contendo todos os elementos com a chave `key` no container. O range é definido por dois iterators, o primeiro apontando para o primeiro elemento do range desejado e o segundo apontando para além do último elemento do range.

3,4) Retorna um range contendo todos os elementos no container com chave equivalente a `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave para comparar os elementos
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

[std::pair](<#/doc/utility/pair>) contendo um par de iterators que definem o range desejado. Se não houver tais elementos, iterators `past-the-end` (veja [end()](<#/doc/container/unordered_multiset/end>)) são retornados como ambos os elementos do par.

### Complexidade

Caso médio linear no número de elementos com a chave `key`, pior caso linear no tamanho do container.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Busca de comparação heterogênea em [contêineres associativos não ordenados](<#/doc/container>), sobrecargas (3,4)

### Exemplo

Estima a frequência de caracteres para uma dada string.

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <unordered_set>
    
    int main()
    {
        std::string sentence{"cppreference.com"};
        std::cout << "The sentence: " << sentence << '\n';
    
        std::unordered_multiset<char> sequence;
        for (char x : sentence)
            sequence.insert(x);
    
        std::cout << "The sequence: { ";
        for (char x : sequence)
            std::cout << x << ' ';
    
        std::cout << "}\n" "Symbol:Frequency: ";
        for (auto it = sequence.begin(); it != sequence.end();)
        {
            if (auto [first, last] = sequence.equal_range(*it); first != last)
            {
                std::cout << *first << ":" << std::distance(first, last) << "  ";
                it = last;
            }
            else
                ++it;
        }
    }
```

Saída possível:
```
    The sentence: cppreference.com
    The sequence: { m o c c c p p r r e e e e f n . }
    Symbol:Frequency: m:1  o:1  c:3  p:2  r:2  e:4  f:1  n:1  .:1
```

### Veja também

[ find](<#/doc/container/unordered_multiset/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_multiset/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ count](<#/doc/container/unordered_multiset/count>) | retorna o número de elementos que correspondem a uma chave específica
(função membro pública)
[ equal_range](<#/doc/algorithm/equal_range>) | retorna range de elementos que correspondem a uma chave específica
(modelo de função)