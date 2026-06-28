# std::numpunct&lt;CharT&gt;::decimal_point, do_decimal_point

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
char_type decimal_point() const;
protected:
virtual char_type do_decimal_point() const;
```

1) Função membro pública, chama a função membro `do_decimal_point` da classe mais derivada.

2) Retorna o caractere a ser usado como separador decimal entre as partes inteira e fracionária.

### Valor de retorno

O valor do tipo `char_type` a ser usado como separador decimal. As especializações padrão de `std::numpunct` retornam '.' e L'.' .

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    struct slash : std::numpunct<char>
    {
        char do_decimal_point() const { return '/'; }  // separate with slash
    };
     
    int main()
    {
        std::cout.precision(10);
        std::cout << "default locale: " << 1234.5678 << '\n';
        std::cout.imbue(std::locale(std::cout.getloc(), new slash));
        std::cout << "locale with modified numpunct: " << 1234.5678 << '\n';
    }
```

Saída:
```
    default locale: 1234.5678
    locale with modified numpunct: 1234/5678
```