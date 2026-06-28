# std::numpunct&lt;CharT&gt;::truename, do_truename, falsename, do_falsename

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
string_type truename() const;
public:
string_type falsename() const;
protected:
virtual string_type do_truename() const;
protected:
virtual string_type do_falsename() const;
```

  
1,2) Função membro pública, chama as funções membro `do_truename` e `do_falsename` da classe mais derivada, respectivamente.

3) Retorna a string a ser usada como representação do valor booleano true.

4) Retorna a string a ser usada como representação do valor booleano false.

### Valor de retorno

1,3) O objeto do tipo `string_type` a ser usado como representação de true. As especializações padrão de `std::numpunct` retornam "true" e L"true".

2,4) O objeto do tipo `string_type` a ser usado como representação de false. As especializações padrão de `std::numpunct` retornam "false" e L"false".

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    struct custom_tf : std::numpunct<char>
    {
        std::string do_truename()  const { return {'t'}; }
        std::string do_falsename() const { return {'f'}; }
    };
    
    int main()
    {
        std::cout << std::boolalpha;
    
        // default boolalpha output
        std::cout << "Default locale,\n"
                     "  boolalpha  true: " << true << "\n"
                     "  boolalpha false: " << false << "\n\n";
    
        // with custom_tf applied to locale
        std::cout.imbue(std::locale(std::cout.getloc(), new custom_tf));
        std::cout << "Locale with modified numpunct,\n"
                     "  boolalpha  true: " << true << "\n"
                     "  boolalpha false: " << false << '\n';
    }
```

Saída: 
```
    Default locale,
      boolalpha  true: true
      boolalpha false: false
    
    Locale with modified numpunct,
      boolalpha  true: t
      boolalpha false: f
```