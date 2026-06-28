# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::equal_range

```cpp
std::pair<iterator, iterator> equal_range( const Key& key );  // (1) (desde C++23)
std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;  // (2) (desde C++23)
template< class K >
std::pair<iterator, iterator> equal_range( const K& x );  // (3) (desde C++23)
template< class K >
std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;  // (4) (desde C++23)
```

  
Retorna um range contendo todos os elementos com a chave fornecida no container. O range é definido por dois iterators, um apontando para o primeiro elemento que _não é menor_ que a chave e outro apontando para o primeiro elemento _maior_ que a chave. Alternativamente, o primeiro iterator pode ser obtido com lower_bound(), e o segundo com upper_bound(). 

1,2) Compara as chaves com key.

3,4) Compara as chaves com o valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  valor da chave para comparar os elementos   
---|---|---
x  |  \-  |  valor alternativo que pode ser comparado a `Key`  
  
### Valor de retorno

[std::pair](<#/doc/utility/pair>) contendo um par de iterators que definem o range desejado: o primeiro apontando para o primeiro elemento que _não é menor_ que a chave e o segundo apontando para o primeiro elemento _maior_ que a chave. 

Se não houver elementos _não menores_ que a chave, um iterator past-the-end (veja end()) é retornado como o primeiro elemento. Similarmente, se não houver elementos _maiores_ que a chave, um iterator past-the-end é retornado como o segundo elemento. 

### Complexidade

Logarítmica no tamanho do container. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <flat_map>
     
    int main()
    {
        const std::flat_map<int, const char*> m
        {
            {0, "zero"},
            {1, "one"},
            {2, "two"}
        };
     
        auto p = m.equal_range(1);
        for (auto& q = p.first; q != p.second; ++q)
            std::cout << "m[" << q->first << "] = " << q->second << '\n';
     
        if (p.second == m.find(2))
            std::cout << "end of equal_range (p.second) is one-past p.first\n";
        else
            std::cout << "unexpected; p.second expected to be one-past p.first\n";
     
        auto pp = m.equal_range(-1);
        if (pp.first == m.begin())
            std::cout << "pp.first is iterator to first not-less than -1\n";
        else
            std::cout << "unexpected pp.first\n";
     
        if (pp.second == m.begin())
            std::cout << "pp.second is iterator to first element greater-than -1\n";
        else
            std::cout << "unexpected pp.second\n";
     
        auto ppp = m.equal_range(3);
        if (ppp.first == m.end())
            std::cout << "ppp.first is iterator to first not-less than 3\n";
        else
            std::cout << "unexpected ppp.first\n";
     
        if (ppp.second == m.end())
            std::cout << "ppp.second is iterator to first element greater-than 3\n";
        else
            std::cout << "unexpected ppp.second\n";
    }
```

Saída: 
```
    m[1] = one
    end of equal_range (p.second) is one-past p.first
    pp.first is iterator to first not-less than -1
    pp.second is iterator to first element greater-than -1
    ppp.first is iterator to first not-less than 3
    ppp.second is iterator to first element greater-than 3
```

### Veja também

[ find](<#/doc/container/flat_map/find>) |  encontra elemento com chave específica   
(função membro pública)  
[ contains](<#/doc/container/flat_map/contains>) |  verifica se o container contém elemento com chave específica   
(função membro pública)  
[ count](<#/doc/container/flat_map/count>) |  retorna o número de elementos que correspondem a uma chave específica   
(função membro pública)  
[ upper_bound](<#/doc/container/flat_map/upper_bound>) |  retorna um iterator para o primeiro elemento _maior_ que a chave fornecida   
(função membro pública)  
[ lower_bound](<#/doc/container/flat_map/lower_bound>) |  retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida   
(função membro pública)  
[ equal_range](<#/doc/algorithm/equal_range>) |  retorna um range de elementos que correspondem a uma chave específica   
(modelo de função)