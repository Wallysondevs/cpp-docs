# std::codecvt&lt;InternT,ExternT,StateT&gt;::always_noconv, do_always_noconv

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
bool always_noconv() const throw();
public:
bool always_noconv() const noexcept;
protected:
virtual bool do_always_noconv() const throw();
protected:
virtual bool do_always_noconv() const noexcept;
```

  
1) Função membro pública, chama a função membro `do_always_noconv` da classe mais derivada.

2) Retorna `true` se tanto [do_in()](<#/doc/locale/codecvt/in>) quanto [do_out()](<#/doc/locale/codecvt/out>) retornarem `std::codecvt_base::noconv` para todas as entradas válidas.

### Valor de retorno

`true` se esta *facet* de conversão não realizar conversões, `false` caso contrário.

A especialização não-conversora [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> retorna `true`.

### Observações

Esta função pode ser usada, por exemplo, na implementação de [std::basic_filebuf::underflow](<#/doc/io/basic_streambuf/underflow>) e [std::basic_filebuf::overflow](<#/doc/io/basic_streambuf/overflow>) para usar cópia de caracteres em massa em vez de chamar [std::codecvt::in](<#/doc/locale/codecvt/in>) ou [std::codecvt::out](<#/doc/locale/codecvt/out>) se for sabido que o *locale* imbuído em [std::basic_filebuf](<#/doc/io/basic_filebuf>) não realiza nenhuma conversão.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        std::cout << "The non-converting char<->char codecvt::always_noconv() returns " 
                  << std::boolalpha
                  << std::use_facet<std::codecvt<char, char, std::mbstate_t>>(
                        std::locale()
                     ).always_noconv() << '\n'
                  << "while wchar_t<->char codecvt::always_noconv() returns "
                  << std::use_facet<std::codecvt<wchar_t, char, std::mbstate_t>>(
                        std::locale()
                     ).always_noconv() << '\n';
    }
```

Saída:
```
    The non-converting char<->char codecvt::always_noconv() returns true
    while wchar_t<->char codecvt::always_noconv() returns false
```