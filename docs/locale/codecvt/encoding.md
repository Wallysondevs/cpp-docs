# std::codecvt&lt;InternT,ExternT,StateT&gt;::encoding, do_encoding

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
int encoding() const throw();
public:
int encoding() const noexcept;
protected:
virtual int do_encoding() const throw();
protected:
virtual int do_encoding() const noexcept;
```

1) Função membro pública, chama a função membro `do_encoding` da classe mais derivada.

2) Se a codificação representada por esta facet `codecvt` mapeia cada caractere interno para o mesmo número constante de caracteres externos, retorna esse número. Se a codificação for de comprimento variável (por exemplo, UTF-8 ou UTF-16), retorna `0`. Se a codificação for dependente de estado, retorna -1.

### Valor de retorno

O número exato de caracteres `externT` que correspondem a um caractere `internT`, se constante. `0` se o número variar, -1 se a codificação for dependente de estado.

A especialização não-conversora [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> retorna 1.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        std::cout << "en_US.utf8 is a variable-length encoding, encoding() returns "
                  << std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
                         std::locale("en_US.utf8")
                     ).encoding() << '\n';
    
        std::cout << "zh_CN.gb18030 is also variable-length, encoding() == "
                  << std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
                         std::locale("zh_CN.gb18030")
                     ).encoding() << '\n';
    
        std::cout << "ru_RU.koi8r is a single-byte encoding, encoding() == "
                  << std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
                         std::locale("ru_RU.koi8r")
                     ).encoding() << '\n';
    }
```

Saída:
```
    en_US.utf8 is a variable-length encoding, encoding() returns 0
    zh_CN.gb18030 is also variable-length, encoding() == 0
    ru_RU.koi8r is a single-byte encoding, encoding() == 1
```

### Veja também

MB_CUR_MAX | número máximo de bytes em um caractere multibyte na locale C atual
(variável macro)
[ do_max_length](<#/doc/locale/codecvt/max_length>)[virtual] | retorna o número máximo de caracteres `ExternT` que poderiam ser convertidos em um único caractere `InternT`
(função membro virtual protegida)