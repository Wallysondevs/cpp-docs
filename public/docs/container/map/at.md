# std::map&lt;Key,T,Compare,Allocator&gt;::at

```cpp
T& at( const Key& key );  // (1)
const T& at( const Key& key ) const;  // (2)
template< class K >
T& at( const K& x );  // (3) (desde C++26)
template< class K >
const T& at( const K& x ) const;  // (4) (desde C++26)
```

Retorna uma referência para o valor mapeado do elemento com a chave especificada. Se nenhum elemento desse tipo existir, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) é lançada.

1,2) A chave é equivalente a key.

3,4) A chave compara-se _equivalente_ ao valor x. A referência para o valor mapeado é obtida como se pela expressão `this->find(x)->second`.

A expressão `this->find(x)` deve ser bem-formada e ter comportamento bem-definido, caso contrário o comportamento é indefinido.

Essas sobrecargas participam da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Isso permite chamar esta função sem construir uma instância de `Key`.

### Parameters

- **key** — a chave do elemento a ser encontrado
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Return value

Uma referência para o valor mapeado do elemento solicitado.

### Exceptions

1,2) [std::out_of_range](<#/doc/error/out_of_range>) se o container não possuir um elemento com a chave especificada.

3,4) [std::out_of_range](<#/doc/error/out_of_range>) se o container não possuir o elemento especificado, ou seja, se `find(x) == end()` for verdadeiro.

### Complexity

Logarítmica no tamanho do container.

### Notes

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers](<#/doc/container>) associativos [ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). ([3,4](<#/doc/container/map/at>))

### Example

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <map>
    
    struct LightKey { int o; };
    struct HeavyKey { int o[1000]; };
    
    // O container deve usar std::less<> (ou outro Comparator transparente) para
    // acessar as sobrecargas (3,4). Isso inclui sobrecargas padrão, como
    // comparação entre std::string e std::string_view.
    bool operator<(const HeavyKey& x, const LightKey& y) { return x.o[0] < y.o; }
    bool operator<(const LightKey& x, const HeavyKey& y) { return x.o < y.o[0]; }
    bool operator<(const HeavyKey& x, const HeavyKey& y) { return x.o[0] < y.o[0]; }
    
    int main()
    {
        std::map<int, char> map{{1, 'a'}, {2, 'b'}};
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
        // Demonstração de comparação transparente.
        std::map<HeavyKey, char, std::less<>> map2{{{1}, 'a'}, {{2}, 'b'}};
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

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 464](<https://cplusplus.github.io/LWG/issue464>) | C++98 | `map` não possuía esta função membro | adicionado
[LWG 703](<https://cplusplus.github.io/LWG/issue703>) | C++98 | o requisito de complexidade estava faltando | adicionado
[LWG 2007](<https://cplusplus.github.io/LWG/issue2007>) | C++98 | o valor de retorno referia-se ao elemento solicitado | refere-se ao seu valor mapeado

### See also

[ operator[]](<#/doc/container/map/operator_at>) | acessa ou insere o elemento especificado
(função membro pública)
[ find](<#/doc/container/map/find>) | encontra elemento com chave específica
(função membro pública)