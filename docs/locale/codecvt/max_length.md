# std::codecvt&lt;InternT,ExternT,StateT&gt;::max_length, do_max_length

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
int max_length() const throw();
public:
int max_length() const noexcept;
protected:
virtual int do_max_length() const throw();
protected:
virtual int do_max_length() const noexcept;
```

  
1) Função membro pública, chama a função membro `do_max_length` da classe mais derivada.

2) Retorna o valor máximo que do_length(state, from, from_end, 1) pode retornar para qualquer range válido `[`from`, `from_end`)` e qualquer `state` válido.

### Valor de retorno

O número máximo de caracteres `ExternT` que poderiam ser consumidos se convertidos por [in()](<#/doc/locale/codecvt/in>) para produzir um caractere `InternT`.

A especialização não-conversora [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> retorna 1.

### Observações

Se a codificação for dependente de estado (encoding() == -1), então mais de `max_length()` caracteres externos podem ser consumidos para produzir um caractere interno.

### Exemplo

Execute este código
```cpp
    #include <codecvt>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        std::cout << "In codecvt_utf8, the longest multibyte character is "
                  << std::codecvt_utf8<wchar_t>().max_length() << " bytes long\n";
     
        std::cout << "In header-consuming codecvt_utf8, the longest multibyte character is "
                  << std::codecvt_utf8<wchar_t,
                                       0x10ffff,
                                       std::consume_header>().max_length() << " bytes long\n";
     
        std::cout << "In this system's en_US.utf8, the longest multibyte character is "
                  << std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
                         std::locale("en_US.utf8")
                     ).max_length() << " bytes long\n";
     
        std::cout << "In this system's zh_CN.gb18030, the longest multibyte character is "
                  << std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
                         std::locale("zh_CN.gb18030")
                     ).max_length() << " bytes long\n";
    }
```

Saída: 
```
    In codecvt_utf8, the longest multibyte character is 4 bytes long
    In header-consuming codecvt_utf8, the longest multibyte character is 7 bytes long
    In this system's en_US.utf8, the longest multibyte character is 6 bytes long
    In this system's zh_CN.gb18030, the longest multibyte character is 4 bytes long
```

### Veja também

MB_CUR_MAX | número máximo de bytes em um caractere multibyte no locale C atual  
(variável macro)  
[ do_encoding](<#/doc/locale/codecvt/encoding>)[virtual] | retorna o número de caracteres `ExternT` necessários para produzir um caractere `InternT`, se constante   
(função membro virtual protegida)