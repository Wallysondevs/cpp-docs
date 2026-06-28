# std::numpunct_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class numpunct_byname : public std::numpunct<CharT>;
```

  
`std::numpunct_byname` é um facet [std::numpunct](<#/doc/locale/numpunct>) que encapsula as preferências de pontuação numérica de uma locale especificada em sua construção.

### Especializações

A standard library tem garantia de fornecer as seguintes especializações: 

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`  
---  
std::numpunct_byname&lt;char&gt; |  facet [std::numpunct](<#/doc/locale/numpunct>) específico da locale para I/O de caracteres estreitos   
---|---
std::numpunct_byname<wchar_t> |  facet [std::numpunct](<#/doc/locale/numpunct>) específico da locale para I/O de caracteres largos   
  
### Tipos aninhados

Tipo  |  Definição   
---|---
`char_type` |  `CharT`  
`string_type` |  [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;  
  
### Funções membro

**(construtor)** |  constrói um novo facet `numpunct_byname`   
(função membro pública)  
**(destrutor)** |  destrói um facet `numpunct_byname`   
(função membro protegida)  
  
##  std::numpunct_byname::numpunct_byname

```cpp
explicit numpunct_byname( const char* name, std::size_t refs = 0 );
explicit numpunct_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

  
Constrói um novo facet `std::numpunct_byname` para uma locale com nome. 

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói o facet quando o último objeto [std::locale](<#/doc/locale/locale>) que o contém é destruído. Caso contrário, o objeto não é destruído. 

###  Parâmetros

name  |  \-  |  o nome da locale   
---|---|---
refs  |  \-  |  o número de referências que se ligam ao facet   
  
##  std::numpunct_byname::~numpunct_byname 

protected:  
~numpunct_byname();

  
Destrói o facet. 

##  Herdado de [std::numpunct](<#/doc/locale/numpunct>)

###  Tipos aninhados

Tipo  |  Definição   
---|---
`char_type` |  `CharT`  
`string_type` |  [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;  
  
### Membros de dados

Membro  |  Descrição   
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] |  o identificador do [facet](<#/doc/locale/locale/facet>)  
  
###  Funções membro

[ decimal_point](<#/doc/locale/numpunct/decimal_point>) |  invoca `do_decimal_point`   
(função membro pública de `std::numpunct<CharT>`)  
[ thousands_sep](<#/doc/locale/numpunct/thousands_sep>) |  invoca `do_thousands_sep`   
(função membro pública de `std::numpunct<CharT>`)  
[ grouping](<#/doc/locale/numpunct/grouping>) |  invoca `do_grouping`   
(função membro pública de `std::numpunct<CharT>`)  
[ truenamefalsename](<#/doc/locale/numpunct/truefalsename>) |  invoca `do_truename` ou `do_falsename`   
(função membro pública de `std::numpunct<CharT>`)  
  
###  Funções membro protegidas

[ do_decimal_point](<#/doc/locale/numpunct/decimal_point>)[virtual] |  fornece o caractere a ser usado como ponto decimal   
(função membro virtual protegida de `std::numpunct<CharT>`)  
[ do_thousands_sep](<#/doc/locale/numpunct/thousands_sep>)[virtual] |  fornece o caractere a ser usado como separador de milhares   
(função membro virtual protegida de `std::numpunct<CharT>`)  
[ do_grouping](<#/doc/locale/numpunct/grouping>)[virtual] |  fornece o número de dígitos entre cada par de separadores de milhares   
(função membro virtual protegida de `std::numpunct<CharT>`)  
[ do_truenamedo_falsename](<#/doc/locale/numpunct/truefalsename>)[virtual] |  fornece a string a ser usada como o nome dos booleanos true e false   
(função membro virtual protegida de `std::numpunct<CharT>`)  
  
### Exemplo

Este exemplo demonstra como aplicar regras de pontuação numérica de outra linguagem sem alterar o restante da locale.

Execute este código
```
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const double number = 1000.25;
        std::wcout << L"default locale: " << number << L'\n';
        std::wcout.imbue(std::locale(std::wcout.getloc(),
                                     new std::numpunct_byname<wchar_t>("ru_RU.UTF8")));
        std::wcout << L"default locale with russian numpunct: " << number << L'\n';
    }
```

Saída: 
```
    default locale: 1000.25
    default locale with russian numpunct: 1 000,25
```

### Veja também

[ numpunct](<#/doc/locale/numpunct>) |  define regras de pontuação numérica   
(modelo de classe)  