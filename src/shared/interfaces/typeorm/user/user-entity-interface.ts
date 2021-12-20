export interface UserEntityInterface {
    /**
     * primaryGeneratedColumn()
     */
    id?: string;

    /**
     * @Column
     * */
    username?: string;

    /**
     * @Column
     * */
    password?: string;

    /**
     * @Column
     * */
    role?: string;

    /**
     * @Column
     * */
    isActive?: boolean;
}
