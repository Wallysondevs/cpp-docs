# std::collate&lt;CharT&gt;::hash, std::collate&lt;CharT&gt;::do_hash

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
long hash( const CharT* beg, const CharT* end ) const;
protected:
virtual long do_hash( const CharT* beg, const CharT* end ) const;
```

  
1) Função membro pública, chama a função membro virtual protegida `do_hash` da classe mais derivada.

2) Converte a sequência de caracteres `[`beg`, `end`)` para um valor inteiro que é igual ao hash obtido para todas as strings que colacionam de forma equivalente nesta locale ([compare()](<#/doc/locale/collate/compare>) retorna ​0​). Para duas strings que não colacionam de forma equivalente, a probabilidade de seus hashes serem iguais deve ser muito pequena, aproximando-se de 1.0 / [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned long&gt;::max().

### Parâmetros

beg  |  \-  |  ponteiro para o primeiro caractere na sequência a ser hashed   
---|---|---
end  |  \-  |  ponteiro para um elemento após o final da sequência a ser hashed   
  
### Valor de retorno

O valor hash que respeita a ordem de colação.

### Nota

As locales fornecidas pelo sistema normalmente não colacionam duas strings como equivalentes ([compare()](<#/doc/locale/collate/compare>) não retorna ​0​) se [`basic_string::operator==`](<#/doc/string/basic_string/operator_cmp>) retornar false, mas um facet [std::collate](<#/doc/locale/collate>) instalado pelo usuário pode fornecer regras de colação diferentes, por exemplo, pode tratar strings como equivalentes se elas tiverem a mesma forma normalizada Unicode.

### Exemplo

Demonstra um container não ordenado ciente de locale.

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
    #include <unordered_set>
    
    struct CollateHash
    {
        template<typename CharT>
        long operator()(const std::basic_string<CharT>& s) const
        {
            return std::use_facet<std::collate<CharT>>(std::locale()).hash(
                       &s[0], &s[0] + s.size()
                   );
        }
    };
    struct CollateEq
    {
        template<typename CharT>
        bool operator()(const std::basic_string<CharT>& s1,
                        const std::basic_string<CharT>& s2) const
        {
            return std::use_facet<std::collate<CharT>>(std::locale()).compare(
                         &s1[0], &s1[0] + s1.size(),
                         &s2[0], &s2[0] + s2.size()
                   ) == 0;
        }
    };
    
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::wcout.imbue(std::locale());
    
        std::unordered_set<std::wstring, CollateHash, CollateEq> s2 = {L"Foo", L"Bar"};
        for (auto& str : s2)
            std::wcout << str << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    Bar Foo
```

### Veja também

[ std::hash<std::basic_string>](<#/doc/string/basic_string/hash>)(desde C++11) |  suporte a hash para strings   
(especialização de template de classe)  