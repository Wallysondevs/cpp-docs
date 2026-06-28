# std::locale::operator()

template< class CharT, class Traits, class Alloc >  
bool operator()( const [std::basic_string](<#/doc/string/basic_string>)<CharT,Traits,Alloc>& s1,  
const [std::basic_string](<#/doc/string/basic_string>)<CharT,Traits,Alloc>& s2 ) const;

  
Compara dois argumentos de string s1 e s2 de acordo com as regras de comparação lexicográfica definidas pelo facet [std::collate](<#/doc/locale/collate>)&lt;CharT&gt; desta locale. Este operador permite que qualquer objeto locale que possua um facet collate seja usado como um predicado binário nos algoritmos padrão (como [std::sort](<#/doc/algorithm/sort>)) e em containers ordenados (como [std::set](<#/doc/container/set>)). 

### Parâmetros

s1  |  \-  |  a primeira string a comparar   
---|---|---
s2  |  \-  |  a segunda string a comparar   
  
### Valor de retorno

true se s1 for lexicograficamente menor que s2, false caso contrário. 

### Possível implementação
```
    template<class CharT, class Traits, class Alloc>
    bool operator()(const std::basic_string<CharT,Traits,Alloc>& s1,
                    const std::basic_string<CharT,Traits,Alloc>& s2) const
    {
        return std::use_facet<std::collate<CharT>>(*this).compare(
                   s1.data(), s1.data() + s1.size(),
                   s2.data(), s2.data() + s2.size()) < 0;
    }
```
  
---  
  
### Exemplo

Um [vector](<#/doc/container/vector>) de [string](<#/doc/string/basic_string>)s pode ser ordenado de acordo com uma locale não padrão usando o objeto locale como comparador:

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <locale>
    #include <string>
    #include <vector>
     
    int main()
    {
        std::vector<std::wstring> v = {L"жил", L"был", L"пёс"};
        std::sort(v.begin(), v.end(), std::locale("ru_RU.UTF8"));
        assert(v[0] == L"был");
        assert(v[1] == L"жил");
        assert(v[2] == L"пёс");
    }
```

### Ver também

[ collate](<#/doc/locale/collate>) |  define comparação lexicográfica e hashing de strings   
(modelo de classe)  