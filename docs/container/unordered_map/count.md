# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::count

```cpp
size_type count( const Key& key ) const;  // (1) (desde C++11)
template< class K >
size_type count( const K& x ) const;  // (2) (desde C++20)
```

1) Retorna o número de elementos com chave que se compara igual ao argumento `key` especificado, que é 0 ou 1, já que este container não permite duplicatas.

2) Retorna o número de elementos com chave que se compara equivalente ao argumento `x` especificado. Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

- **key** — valor da chave dos elementos a serem contados
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

1) Número de elementos com a chave `key`, que é 1 ou 0.

2) Número de elementos com chave que se compara equivalente a `x`.

### Complexidade

Constante em média, no pior caso linear no tamanho do container.

### Notas

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Pesquisa de comparação heterogênea em [containers associativos não ordenados](<#/doc/container>), sobrecarga (2)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <unordered_map>
    
    int main()
    {
        std::unordered_map<int, std::string> dict = {
            {1, "one"}, {6, "six"}, {3, "three"}
        };
        dict.insert({4, "four"});
        dict.insert({5, "five"});
        dict.insert({6, "six"});
    
        std::cout << "dict: { ";
        for (auto const& [key, value] : dict)
            std::cout << '[' << key << "]=" << value << ' ';
        std::cout << "}\n\n";
    
        for (int i{1}; i != 8; ++i)
            std::cout << "dict.count(" << i << ") = " << dict.count(i) << '\n';
    }
```

Saída possível:
```
    dict: { [5]=five [4]=four [1]=one [6]=six [3]=three }
    
    dict.count(1) = 1
    dict.count(2) = 0
    dict.count(3) = 1
    dict.count(4) = 1
    dict.count(5) = 1
    dict.count(6) = 1
    dict.count(7) = 0
```

### Veja também

[ find](<#/doc/container/unordered_map/find>) | encontra elemento com chave específica
(função membro pública)
[ contains](<#/doc/container/unordered_map/contains>)(C++20) | verifica se o container contém elemento com chave específica
(função membro pública)
[ equal_range](<#/doc/container/unordered_map/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(função membro pública)