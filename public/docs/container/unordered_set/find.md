# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::find

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

Um iterator para o elemento solicitado. Se nenhum elemento for encontrado, um iterator past-the-end (veja [end()](<#/doc/container/unordered_set/end>)) é retornado. 

### Complexidade

Constante em média, no pior caso linear no tamanho do container. 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_generic_unordered_lookup`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | Pesquisa de comparação heterogênea em [containers associativos não ordenados](<#/doc/container>); sobrecargas ([3,4](<#/doc/container/unordered_set/find>))  
  
### Exemplo

Execute este código
```cpp 
    #include <cstddef>
    #include <functional>
    #include <iostream>
    #include <source_location>
    #include <string>
    #include <string_view>
    #include <unordered_set>
    
    using namespace std::literals;
    
    namespace logger { bool enabled{false}; }
    
    inline void who(const std::source_location sloc = std::source_location::current())
    {
        if (logger::enabled)
            std::cout << sloc.function_name() << '\n';
    }
    
    struct string_hash // C++20's transparent hashing
    {
        using hash_type = std::hash<std::string_view>;
        using is_transparent = void;
    
        std::size_t operator()(const char* str) const
        {
            who();
            return hash_type{}(str);
        }
        std::size_t operator()(std::string_view str) const
        {
            who();
            return hash_type{}(str);
        }
        std::size_t operator()(std::string const& str) const
        {
            who();
            return hash_type{}(str);
        }
    };
    
    int main()
    {
        std::unordered_set<int> example{1, 2, -10};
    
        std::cout << "Simple comparison demo:\n" << std::boolalpha;
        if (auto search = example.find(2); search != example.end())
            std::cout << "Found " << *search << '\n';
        else
            std::cout << "Not found\n";
    
        std::unordered_set<std::string, string_hash, std::equal_to<>> set{"one"s, "two"s};
    
        logger::enabled = true;
        std::cout << "Heterogeneous lookup for unordered containers (transparent hashing):\n"
                  << (set.find("one")   != set.end()) << '\n'
                  << (set.find("one"s)  != set.end()) << '\n'
                  << (set.find("one"sv) != set.end()) << '\n';
    }
```

Saída possível: 
```
    Simple comparison demo:
    Found 2
    Heterogeneous lookup for unordered containers (transparent hashing):
    std::size_t string_hash::operator()(const char*) const
    true
    std::size_t string_hash::operator()(const std::string&) const
    true
    std::size_t string_hash::operator()(std::string_view) const
    true
```

### Veja também

[ count](<#/doc/container/unordered_set/count>) | retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/unordered_set/equal_range>) | retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)