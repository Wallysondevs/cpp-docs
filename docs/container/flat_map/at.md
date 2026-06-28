# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::at

```cpp
T& at( const Key& key );  // (1) (desde C++23)
const T& at( const Key& key ) const;  // (2) (desde C++23)
template< class K >
T& at( const K& x );  // (3) (desde C++23)
template< class K >
const T& at( const K& x ) const;  // (4) (desde C++23)
```

  
Retorna uma referência para o valor mapeado do elemento com a chave especificada. Se nenhum elemento desse tipo existir, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) é lançada. 

1,2) A chave é equivalente a `key`.

3,4) A chave compara-se _equivalente_ ao valor `x`. A referência para o valor mapeado é obtida como se pela expressão `this->find(x)->second`.

A expressão `this->find(x)` deve ser bem-formada e ter comportamento bem definido, caso contrário o comportamento é indefinido.

Essas sobrecargas participam da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Isso permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  a chave do elemento a ser encontrado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

Uma referência para o valor mapeado do elemento solicitado. 

### Exceções

1,2) [std::out_of_range](<#/doc/error/out_of_range>) se o container não possuir um elemento com a chave especificada.

3,4) [std::out_of_range](<#/doc/error/out_of_range>) se o container não possuir o elemento especificado, ou seja, se `find(x) == end()` for verdadeiro.

### Complexidade

Logarítmica no tamanho do container. 

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <iostream>
    #include <flat_map>
     
    struct LightKey { int o; };
    struct HeavyKey { int o[1000]; };
     
    // The container must use std::less<> (or other transparent Comparator) to
    // access overloads (3,4). This includes standard overloads, such as
    // comparison between std::string and std::string_view.
    bool operator<(const HeavyKey& x, const LightKey& y) { return x.o[0] < y.o; }
    bool operator<(const LightKey& x, const HeavyKey& y) { return x.o < y.o[0]; }
    bool operator<(const HeavyKey& x, const HeavyKey& y) { return x.o[0] < y.o[0]; }
     
    int main()
    {
        std::flat_map<int, char> map{{1, 'a'}, {2, 'b'}};
        assert(map.at(1) == 'a');
        assert(map.at(2) == 'b');
        try
        {
            map.at(13);
        }
        catch(const std::out_of_range& ex)
        {
            std::cout << "1) out_of_range::what(): " << ex.what() << '\n';
        }
     
    #ifdef __cpp_lib_associative_heterogeneous_insertion
        // Transparent comparison demo.
        std::flat_map<HeavyKey, char, std::less<>> map2{{{1}, 'a'}, {{2}, 'b'}};
        assert(map2.at(LightKey{1}) == 'a');
        assert(map2.at(LightKey{2}) == 'b');
        try
        {
            map2.at(LightKey{13});
        }
        catch(const std::out_of_range& ex)
        {
            std::cout << "2) out_of_range::what(): " << ex.what() << '\n';
        }
    #endif
    }
```

Saída possível: 
```
    1) out_of_range::what(): map::at:  key not found
    2) out_of_range::what(): map::at:  key not found
```

### Veja também

[ operator[]](<#/doc/container/flat_map/operator_at>) | acessa ou insere o elemento especificado   
(função membro pública)  
[ find](<#/doc/container/flat_map/find>) | encontra elemento com chave específica   
(função membro pública)