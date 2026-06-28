# std::strstreambuf::freeze

void freeze( bool freezefl = true ); |  |  (obsoleto em C++98)   
(removido em C++26)  

  
Se o buffer usa alocação dinâmica, define o status de congelamento do stream para freezefl.

Enquanto o stream está congelado, [overflow()](<#/doc/io/strstreambuf/overflow>) não realocará o buffer e o [`destructor`](<#/doc/io/strstreambuf/~strstreambuf>) não desalocará o buffer (causando assim um vazamento de memória).

### Parâmetros

freezefl  |  \-  |  novo valor para definir o status de congelamento   
  
### Valor de retorno

(nenhum)

### Observações

Cada chamada a [str()](<#/doc/io/strstreambuf/str>) congela o stream para preservar a validade do ponteiro que ele retorna. Para permitir que o destructor desalocue o buffer, freeze(false) precisa ser chamado explicitamente.

### Exemplo

Neste exemplo, a alocação inicial do array subjacente foi para 16 bytes.

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
     
    int main()
    {
        {
            std::strstream dyn; // buffer de leitura/escrita alocado dinamicamente
            dyn << "Test: " << 1.23; // nota: sem std::ends para demonstrar o comportamento de anexação
            std::cout << "dynamic buffer holds " << dyn.pcount() << " characters: '";
            std::cout.write(dyn.str(), dyn.pcount()) << "'\n";
            // o buffer está agora congelado, saída adicional não fará o buffer crescer
            dyn << "more output, hopefully enough to run out of the allocated space"
                << std::ends;
            std::cout << "After more output, it holds "
                      << dyn.pcount() << " characters: '" << dyn.str() << "'\n";
            dyn.freeze(false); // descongelar antes do destrutor
        } // memória liberada pelo destrutor
     
        {
            char arr[20];
            std::ostrstream st(arr, sizeof arr); // buffer de tamanho fixo
            st << 1.23; // nota: sem std::ends para demonstrar o comportamento de anexação
            std::cout << "static buffer holds "
                      << st.pcount() << " characters: '";
            std::cout.write(st.str(), st.pcount());
            std::cout << "'\n";
            st << "more output, hopefully enough to run out of the allocated space"
               << std::ends;
            std::cout << "static buffer holds "
                      << st.pcount() << " characters: '";
            std::cout.write(st.str(), st.pcount());
            std::cout << "'\n";
        } // nada para desalocar, não há necessidade de descongelar,
    }
```

Saída:
```
    dynamic buffer holds 10 characters: 'Test: 1.23'
    After more output, it holds 16 characters: 'Test: 1.23more o'
    static buffer holds 4 characters: '1.23'
    static buffer holds 20 characters: '1.23more output, hop'
```

### Veja também

[ freeze](<#/doc/io/strstream/freeze>) |  desabilita/habilita a realocação automática   
(função membro pública de `std::strstream`)  
[ freeze](<#/doc/io/ostrstream/freeze>) |  desabilita/habilita a realocação automática   
(função membro pública de `std::ostrstream`)  
[ (destructor)](<#/doc/io/strstreambuf/~strstreambuf>)[virtual] |  destrói um objeto `strstreambuf`, opcionalmente desalocando o array de caracteres   
(função membro pública virtual)  
[ overflow](<#/doc/io/strstreambuf/overflow>)[virtual] |  anexa um caractere à sequência de saída, pode realocar ou alocar inicialmente o buffer se dinâmico e não congelado   
(função membro protegida virtual)