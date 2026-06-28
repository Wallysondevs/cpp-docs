# std::basic_ios&lt;CharT,Traits&gt;::copyfmt

basic_ios& copyfmt( const basic_ios& other );

Se `other` se refere ao mesmo objeto que `*this`, não tem efeitos. Caso contrário, copia o estado do stream `other` para `*this`. Isso é feito na seguinte sequência:

1) Chama cada callback registrado por [register_callback()](<#/doc/io/ios_base/register_callback>) passando [`erase_event`](<#/doc/io/ios_base/event>) como parâmetro.

2) Copia todos os objetos membro de `other` para `*this`, exceto por [rdstate()](<#/doc/io/basic_ios/rdstate>), a máscara de exceção, e [rdbuf()](<#/doc/io/basic_ios/rdbuf>). Em particular, faz cópias da locale, dos flags de formatação, do conteúdo dos arrays [std::ios_base::iword](<#/doc/io/ios_base/iword>) e [std::ios_base::pword](<#/doc/io/ios_base/pword>) (mas não os próprios ponteiros `iword` e `pword`), dos callbacks, e do stream atrelado (tied stream).

3) Chama cada callback registrado por [register_callback()](<#/doc/io/ios_base/register_callback>) passando [`copyfmt_event`](<#/doc/io/ios_base/event>) como parâmetro.

4) Copia a máscara de exceção de `other` para `*this` como se chamasse `exceptions(other.exceptions())`.

### Parâmetros

- **other** — outro stream para usar como fonte

### Valor de retorno

*this

### Notas

A segunda passagem pelos callbacks pode ser usada para fazer uma cópia profunda (deep-copy) dos objetos definidos pelo usuário apontados pelos ponteiros em [std::ios_base::pword](<#/doc/io/ios_base/pword>).

`copyfmt()` pode ser usado para salvar e restaurar o estado de um stream. Boost fornece uma biblioteca de [salvadores de estado de E/S](<https://www.boost.org/doc/libs/release/libs/io/doc/ios_state.html>) mais granular para o mesmo propósito.

### Exemplo

Faz com que o objeto [std::ofstream](<#/doc/io/basic_ofstream>) "out" se comporte exatamente como [std::cout](<#/doc/io/cout>), incluindo formatação, [`tie()`](<#/doc/io/basic_ios/tie>) para [std::cin](<#/doc/io/cin>), etc.

Execute este código
```cpp
    #include <bitset>
    #include <climits>
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::ofstream out;
     
        out.copyfmt(std::cout); // copia tudo exceto rdstate e rdbuf
        out.clear(std::cout.rdstate()); // copia rdstate
        out.basic_ios<char>::rdbuf(std::cout.rdbuf()); // compartilha o buffer
     
        out << "Hello, world\n";
     
        auto bin =  f)
        {
            return std::bitset<sizeof(std::ios_base::fmtflags) * CHAR_BIT>
                { static_cast<unsigned long long>(f) };
        };
        std::ofstream out2;
        std::cout << "1) out2.flags(): " << bin(out2.flags()) << '\n';
        std::cout << "2) cout.flags(): " << bin(std::cout.flags()) << '\n';
        std::cout.setf(std::ios::hex | std::ios::fixed | std::ios::boolalpha);
        std::cout << "3) cout.flags(): " << bin(std::cout.flags()) << '\n';
        out2.copyfmt(std::cout); // copia tudo exceto rdstate e rdbuf
        std::cout << "4) out2.flags(): " << bin(out2.flags()) << '\n';
    }
```

Saída possível:
```
    Hello, world
    1) out2.flags(): 00000000000000000001000000000010
    2) cout.flags(): 00000000000000000001000000000010
    3) cout.flags(): 00000000000000000001000000001111
    4) out2.flags(): 00000000000000000001000000001111
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 256](<https://cplusplus.github.io/LWG/issue256>) | C++98 | o passo 3 chamava os callbacks registrados com o tipo de evento `copy_event`, que não é definido | corrigido para [`copyfmt_event`](<#/doc/io/ios_base/event>)
[LWG 292](<https://cplusplus.github.io/LWG/issue292>) | C++98 | se `other` se referisse ao mesmo objeto que `*this`, os objetos membro ainda eram copiados e os callbacks registrados ainda eram chamados | não fazer nada neste caso