# std::set&lt;Key,Compare,Allocator&gt;::equal_range

```cpp
std::pair<iterator, iterator> equal_range( const Key& key );  // (1)
std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;  // (2)
template< class K >
std::pair<iterator, iterator> equal_range( const K& x );  // (3) (desde C++14)
template< class K >
std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;  // (4) (desde C++14)
```

  
Retorna um range contendo todos os elementos com a chave fornecida no container. O range é definido por dois iterators, um apontando para o primeiro elemento que _não é menor_ que `key` e outro apontando para o primeiro elemento _maior_ que `key`. Alternativamente, o primeiro iterator pode ser obtido com [lower_bound()](<#/doc/container/set/lower_bound>), e o segundo com [upper_bound()](<#/doc/container/set/upper_bound>). 

1,2) Compara as chaves com `key`.

3,4) Compara as chaves com o valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Permite chamar esta função sem construir uma instância de `Key`.

### Parameters

key  |  \-  |  valor da chave para comparar os elementos   
---|---|---
x  |  \-  |  valor alternativo que pode ser comparado a `Key`  
  
### Return value

[std::pair](<#/doc/utility/pair>) contendo um par de iterators que definem o range desejado: o primeiro apontando para o primeiro elemento que _não é menor_ que `key` e o segundo apontando para o primeiro elemento _maior_ que `key`. 

Se não houver elementos _não menores_ que `key`, um iterator past-the-end (veja [end()](<#/doc/container/set/end>)) é retornado como o primeiro elemento. Similarmente, se não houver elementos _maiores_ que `key`, um iterator past-the-end é retornado como o segundo elemento. 

### Complexity

Logarítmica no tamanho do container. 

### Notes

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Pesquisa de comparação heterogênea em [containers associativos](<#/doc/container>), para as sobrecargas ([3,4](<#/doc/container/set/equal_range>))  
  
### Example

Execute este código
```cpp
    #include <set>
    #include <functional>
    #include <print>
    #include <ranges>
    #include <string>
    #include <string_view>
    #include <tuple>
    
    struct Names
    {
        std::string forename, surname;
        friend auto operator<(const Names& lhs, const Names& rhs)
        {
            return std::tie(lhs.surname, lhs.forename) < std::tie(rhs.surname, rhs.forename);
        }
    };
    
    struct SurnameCompare
    {
        std::string_view surname;
    
        friend bool operator<(const Names& lhs, const SurnameCompare& rhs)
        {
            return lhs.surname < rhs.surname;
        }
    
        friend bool operator<(const SurnameCompare& lhs, const Names& rhs)
        {
            return lhs.surname < rhs.surname;
        }
    }; 
    
    std::set<Names, std::less<>> characters
    {
        {"Homer", "Simpson"},
        {"Marge", "Simpson"},
        {"Lisa", "Simpson"},
        {"Ned", "Flanders"},
        {"Joe", "Quimby"}
    };
    
    void print_unique(const Names& names)
    {
        auto [begin, end] = characters.equal_range(names);
        std::print(
            "Found {} characters with name \"{} {}\"\n", 
            std::distance(begin, end), 
            names.forename, names.surname
        );
    }
    
    void print_by_surname(std::string_view surname)
    {
        auto [begin, end] = characters.equal_range(SurnameCompare{surname});
        std::print("Found {} characters with surname \"{}\":\n", std::distance(begin, end), surname);
        for (const Names& names : std::ranges::subrange(begin, end))
            std::print("    {} {}\n", names.forename, names.surname);
    }
    
    int main()
    {
        print_unique({"Maude", "Flanders"});
        print_unique({"Lisa", "Simpson"});
        print_by_surname("Simpson");
    }
```

Output: 
```
    Found 0 characters with name "Maude Flanders"
    Found 1 characters with name "Lisa Simpson"
    Found 3 characters with surname "Simpson":
        Homer Simpson
        Lisa Simpson
        Marge Simpson
```

### See also

[ find](<#/doc/container/set/find>) |  encontra elemento com chave específica   
(função membro pública)  
[ contains](<#/doc/container/set/contains>)(C++20) |  verifica se o container contém elemento com chave específica   
(função membro pública)  
[ count](<#/doc/container/set/count>) |  retorna o número de elementos que correspondem à chave específica   
(função membro pública)  
[ upper_bound](<#/doc/container/set/upper_bound>) |  retorna um iterator para o primeiro elemento _maior_ que a chave fornecida   
(função membro pública)  
[ lower_bound](<#/doc/container/set/lower_bound>) |  retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida   
(função membro pública)  
[ equal_range](<#/doc/algorithm/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(template de função)