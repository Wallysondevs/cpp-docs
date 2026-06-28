# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::find

```cpp
iterator find( const Key& key );  // (1) (desde C++11)
const_iterator find( const Key& key ) const;  // (2) (desde C++11)
template< class K >
iterator find( const K& x );  // (3) (desde C++20)
template< class K >
const_iterator find( const K& x ) const;  // (4) (desde C++20)
```

  
1,2) Encontra um elemento com chave equivalente a key. 

3,4) Encontra um elemento com chave que se compara _equivalente_ ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se Hash::is_transparent e KeyEqual::is_transparent forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave do elemento a ser procurado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

Um iterator para o elemento solicitado. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/unordered_map/end>)) é retornado. 

### Complexidade

Constante em média, no pior caso linear no tamanho do container. 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Pesquisa de comparação heterogênea em [containers associativos não ordenados](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/unordered_map/find>))  
  
### Exemplo

Execute este código
```
    #include <cstddef>
    #include <functional>
    #include <iostream>
    #include <string>
    #include <string_view>
    #include <unordered_map>
     
    using namespace std::literals;
     
    struct string_hash
    {
        using hash_type = std::hash<std::string_view>;
        using is_transparent = void;
     
        std::size_t operator()(const char* str) const        { return hash_type{}(str); }
        std::size_t operator()(std::string_view str) const   { return hash_type{}(str); }
        std::size_t operator()(std::string const& str) const { return hash_type{}(str); }
    };
     
    int main()
    {
        // simple comparison demo
        std::unordered_map<int, char> example{{1, 'a'}, {2, 'b'}};
     
        if (auto search = example.find(2); search != example.end())
            std::cout << "Found " << search->first << ' ' << search->second << '\n';
        else
            std::cout << "Not found\n";
     
        // C++20 demo: Heterogeneous lookup for unordered containers (transparent hashing)
        std::unordered_map<std::string, size_t, string_hash, std::equal_to<>> map{{"one"s, 1}};
        std::cout << std::boolalpha
            << (map.find("one")   != map.end()) << '\n'
            << (map.find("one"s)  != map.end()) << '\n'
            << (map.find("one"sv) != map.end()) << '\n';
    }
```

Output: 
```
    Found 2 b
    true
    true
    true
```

### Veja também

[ at](<#/doc/container/unordered_map/at>) |  acessa o elemento especificado com verificação de limites   
(função membro pública)  
[ operator[]](<#/doc/container/unordered_map/operator_at>) |  acessa ou insere o elemento especificado   
(função membro pública)  
[ count](<#/doc/container/unordered_map/count>) |  retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/unordered_map/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)