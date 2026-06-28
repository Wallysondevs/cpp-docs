# std::set&lt;Key,Compare,Allocator&gt;::count

```cpp
size_type count( const Key& key ) const;  // (1)
template< class K >
size_type count( const K& x ) const;  // (2) (desde C++14)
```

  
Retorna o número de elementos com chave que se compara _equivalente_ ao argumento especificado.

1) Retorna o número de elementos com a chave `key`. Isso é 1 ou 0, já que este container não permite duplicatas.

2) Retorna o número de elementos com chave que se compara equivalente ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave dos elementos a serem contados   
---|---|---
x  |  \-  |  valor alternativo para comparar com as chaves   
  
### Valor de retorno

Número de elementos com chave que se compara _equivalente_ a `key` ou `x`, que, para a sobrecarga (1), é 1 ou 0.

### Complexidade

Logarítmica no tamanho do container mais linear no número de elementos encontrados.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_generic_associative_lookup`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Pesquisa de comparação heterogênea em [containers associativos](<#/doc/container>); sobrecarga (2)  
  
### Exemplo

Execute este código
```
    #include <functional>
    #include <iostream>
    #include <set>
     
    struct S
    {
        int x;
        S(int i) : x{i} { std::cout << "S{" << i << "} "; }
        bool operator<(S const& s) const { return x < s.x; }
    };
     
    struct R
    {
        int x;
        R(int i) : x{i} { std::cout << "R{" << i << "} "; }
        bool operator<(R const& r) const { return x < r.x; }
    };
     
    bool operator<(R const& r, int i) { return r.x < i; }
    bool operator<(int i, R const& r) { return i < r.x; }
     
    int main()
    {
        std::set<int> t{3, 1, 4, 1, 5};
        std::cout << t.count(1) << ", " << t.count(2) << ".\n";
     
        std::set<S> s{3, 1, 4, 1, 5};
        std::cout << ": " << s.count(1) << ", " << s.count(2) << ".\n";
            // Dois objetos temporários S{1} e S{2} foram criados.
            // O objeto de função de comparação é std::less<S> por padrão,
            // que não é transparente (não possui o tipo membro is_transparent).
     
        std::set<R, std::less<>> r{3, 1, 4, 1, 5};
        std::cout << ": " << r.count(1) << ", " << r.count(2) << ".\n";
            // Pesquisa heterogênea C++14; objetos temporários não foram criados.
            // O comparador std::less<void> possui is_transparent pré-definido.
    }
```

Saída: 
```
    1, 0.
    S{3} S{1} S{4} S{1} S{5} : S{1} 1, S{2} 0.
    R{3} R{1} R{4} R{1} R{5} : 1, 0.
```

### Veja também

[ find](<#/doc/container/set/find>) |  encontra elemento com chave específica   
(função membro pública)  
[ equal_range](<#/doc/container/set/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(função membro pública)