# std::basic_osyncstream&lt;CharT,Traits,Allocator&gt;::operator=

```cpp
basic_osyncstream& operator=( std::basic_osyncstream&& other );  // (desde C++20)
```

  
Atribui por movimento um stream de saída sincronizada: 

Atribui por movimento o std::basic_syncbuf encapsulado do membro correspondente de `other` (após esta atribuição por movimento, `other.get_wrapped()` retorna um ponteiro nulo e a destruição de `other` não produz saída; qualquer saída em buffer pendente será emitida) e [atribui por movimento](<#/>) o [std::basic_ostream](<#/doc/io/basic_ostream>) base (isso troca todas as variáveis de estado do stream, exceto `rdbuf`, entre `*this` e `other`) 

### Parâmetros

other  |  \-  |  outro stream de saída sincronizada para mover de   
  
### Valor de retorno

`*this`

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    #include <syncstream>
    #include <utility>
     
    int main()
    {
        std::osyncstream out(std::cout);
        out << "test\n";
        std::ostringstream str_out;
        std::osyncstream{str_out} = std::move(out); // Note that out is emitted here
        std::cout << "str_out = " << std::quoted(str_out.view()) << '\n';
    }
```

Saída: 
```
    test
    str_out = ""
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3867](<https://cplusplus.github.io/LWG/issue3867>) | C++20  | o operador de atribuição por movimento era `noexcept`, mas  
o operador de atribuição por movimento de [`std::basic_syncbuf`](<#/doc/io/basic_syncbuf>) não é  | removido `noexcept`  
  
### Veja também

[ (constructor)](<#/doc/io/basic_osyncstream/basic_osyncstream>) |  constrói um objeto `basic_osyncstream`   
(função membro pública)  
[ (destructor)](<#/doc/io/basic_osyncstream/~basic_osyncstream>) |  destrói o `basic_osyncstream` e emite seu buffer interno   
(função membro pública)  
[ emit](<#/doc/io/basic_osyncstream/emit>) |  chama [`emit()`](<#/doc/io/basic_syncbuf/emit>) no `basic_syncbuf` subjacente para transmitir seus dados internos para o destino final   
(função membro pública)